import * as t from "io-ts";
import { MaybePromise, MaybeArray, Predicate, RegExpType } from "./utils/util-types";
import { identity, noop, isEmpty, constant } from "lodash";
import { checkArray, checkNil, checkFn } from "./utils/guards";
import { assertType } from "./utils/assertions";
import { maybeArray } from "./utils/maybe";
import { matchString } from "./utils/predicate";

/**
 * Covers all the primitive mutation types used in the MutationNotification objects
 * that are constructed by GRelDAL
 */
export enum PrimitiveMutationType {
    Insert = "INSERT",
    Update = "UPDATE",
    Delete = "DELETE",
}

/**
 * A notification to be published that conveys information about a mutation that
 * has happened in the application.
 *
 * These mutations may not be GraphQL mutations, and application backend
 * can choose to use NotificationDispatcher to dispatch events which will
 * become available through GraphQL subscriptions.
 *
 * Must be serializable
 */
export interface MutationNotification<TEntity extends {} = any> {
    /**
     * Mapped name of the data source where the operation originated from
     */
    source?: string;

    /**
     * Type of Mutation. For notifications generated by GRelDAL this will
     * always be of PrimitiveMutationType
     */
    type: string;

    /**
     * List of entities affected by this mutation.
     *
     * This list can be heterogeneous in case of application generated
     * Mutations.
     *
     * For GRelDAL generated mutation notifications, this list will
     * have only a single member currently.
     */
    entities: TEntity[];

    /**
     * Application specific metadata
     */
    metadata?: any;
}

/**
 * Represents a notification for a single (usually atomic) operation that changes the state of
 * a singe datasource
 */
export interface PrimitiveMutationNotification<TEntity extends {}> extends MutationNotification<TEntity> {
    type: PrimitiveMutationType;
}

/**
 * A function that intercepts a list of notifications and can transform it.
 *
 * Only those notifications will be published which have been removed from the interceptor.
 */
interface NotificationDispatchInterceptor {
    (notification: Array<MutationNotification<any>>): MaybePromise<Array<MutationNotification<any>>>;
}

const StringPredicateRT = maybeArray(t.union([t.string, RegExpType, t.Function]));

const NotificationDispatchInterceptorConfigRT = t.intersection([
    t.partial({
        type: StringPredicateRT,
        source: StringPredicateRT,
    }),
    t.type({
        intercept: t.union([t.Function, t.boolean]),
    }),
], "NotificationDispatchInterceptorConfig");

/**
 * Specifies what Notifications are to be intercepted.
 */
interface NotificationDispatchInterceptorConfig extends t.TypeOf<typeof NotificationDispatchInterceptorConfigRT> {
    /**
     * Specifies which notifications are to be intercepted based on type.
     *
     * This can be:
     *
     * - A string: In which case an exact match is performed against the type property of notification
     * - A regular expression to match the type property by a pattern
     * - A function that takes the type property value and returns true/false
     * - An array of the above, in which case any of the predicates matching will be considered a successful match.
     *
     * If both type and source are specified, then incoming notifications must match *both* of them
     * to be intercepted.
     */

    type?: MaybeArray<string | RegExp | Predicate<string>>;

    /**
     * Specifies which notifications are to be intercepted based on source.
     *
     * This can be:
     *
     * - A string: In which case an exact match is performed against the source property of notification
     * - A regular expression to match the source property by a pattern
     * - A function that takes the source property value and returns true/false
     * - An array of the above, in which case any of the predicates matching will be considered a successful match.
     *
     * If both type and source are specified, then incoming notifications must match *both* of them
     * to be intercepted.
     */
    source?: MaybeArray<string | RegExp | Predicate<string>>;

    /**
     * Whether the notifications not matching the aforementioned type/source should be retained
     * or discarded.
     *
     * True (retained) by default.
     *
     * In a chain of dispatch interceptors, if any of the interceptors choses not to retain
     * notifications that don't match, they will not be available to other interceptors
     * down the chain.
     */
    retainRest?: boolean;

    /**
     * Interceptor function that receives list of notifications to be published and can choose
     * to augment, transform or remove them.
     *
     * Only the notifications actually returned from the interceptor will be published.
     *
     * This can be:
     * - A function, which will receives list of notifications to be published and can choose
     * to augment, transform or remove them.
     * - True, in which case all matched notifications are returned as is
     * - False, in which case all matched notifications are discarded
     */
    intercept: NotificationDispatchInterceptor | boolean;
}

interface NormalizedNotificationDispatcherConfig {
    intercept: NotificationDispatchInterceptor;
    publish: (notification: MutationNotification<any>) => void;
}

const NotificationDispatcherConfigRT = t.intersection([
    t.partial({
        intercept: maybeArray(t.union([t.Function, NotificationDispatchInterceptorConfigRT])),
    }),
    t.type({
        publish: t.Function,
    }),
], "NotificationDispatcherConfig");

/**
 * Global notification Dispatcher Configuration
 */
interface NotificationDispatcherConfig extends t.TypeOf<typeof NotificationDispatcherConfigRT> {
    /**
     * Interceptors which can receive and transform, add or remove notifications before
     * they are published.
     *
     * The interceptor can be:
     *
     * 1. A configuration of type {@link NotificationDispatchInterceptorConfig} which will specify
     *    which notifications are to be intercepted based on type or source.
     *
     * 2. A function that receives an array of notifications and returns transformed list of notifications
     *    Only the notifications that are returned by this interceptor will be published.
     *
     * 3. An array of either of the above, in which case the interceptors will be composed
     *    as a chain of middlewares, and only the notifications that are returned by the last interceptor
     *    in the chain will be published.
     */
    intercept?: MaybeArray<NotificationDispatchInterceptor | NotificationDispatchInterceptorConfig>;

    /**
     * Function used to publish the notifications to an observable channel.
     *
     * This can be used for graphql-subscriptions integration:
     */
    publish: (notification: MutationNotification<any>) => void;
}

const normalizeInterceptor = (i: NotificationDispatchInterceptorConfig | NotificationDispatchInterceptor) => {
    if (checkFn(i)) return i;
    const checkSource = checkNil(i.source) ? constant(true) : matchString(i.source);
    const checkType = checkNil(i.type) ? constant(true) : matchString(i.type);
    const intercept = checkFn(i.intercept)
        ? // When provided as a function, return the interceptor as is
          i.intercept
        : i.intercept
        ? // When provided as true, assume that received notifications are to be
          // returned as is.
          //
          // This is primarily helpful in conjunction with retainRest: false to discard
          // some notifications
          (identity as NotificationDispatchInterceptor)
        : // When specified as false, assume that received notifications are to be
          // discarded
          constant([]);
    return async (narr: MutationNotification[]): Promise<MutationNotification[]> => {
        const retained: MutationNotification[] = [];
        const consumed: MutationNotification[] = [];
        for (const n of narr) {
            if ((checkNil(n.source) || checkSource(n.source)) && checkType(n.type)) {
                consumed.push(n);
            } else if (i.retainRest !== false) {
                retained.push(n);
            }
        }
        if (!isEmpty(consumed)) {
            const intercepted = await intercept(consumed);
            return intercepted.concat(retained);
        }
        return retained;
    };
};

const normalize = (c: NotificationDispatcherConfig): NormalizedNotificationDispatcherConfig => {
    let intercept: NotificationDispatchInterceptor;
    if (checkNil(c.intercept)) intercept = identity;
    else if (checkArray(c.intercept)) {
        const steps = c.intercept.map(i => normalizeInterceptor(i));
        intercept = async (notifications: MutationNotification<any>[]) => {
            for (const step of steps) {
                if (isEmpty(notifications)) return notifications;
                notifications = await step(notifications);
            }
            return notifications;
        };
    } else intercept = normalizeInterceptor(c.intercept);
    return { ...c, intercept };
};

export const defaultConfig: NormalizedNotificationDispatcherConfig = Object.freeze({
    intercept: identity,
    publish: noop,
});

/**
 * The current configuration of NotificationDispatcher.
 *
 * Default configuration does nothing: it has no interceptors and it publishes nowhere.
 */
export let config = defaultConfig;

/**
 * Configure NotificationDispatcher.
 *
 * Note that the NotificationDispatcher is singleton and thus re-invocation of this function is
 * not recommended.
 *
 * If re-invoked the previous configuration will be overriden completely (and NOT merged). So
 * any previous interceptors will get lost. If merging is desired, it should be taken care of either
 * at the application level or by passing a function to configure which will receive previous/default
 * configuration.
 */
export function configure(cfg: NotificationDispatcherConfig) {
    assertType(NotificationDispatcherConfigRT, cfg, "NotificationDispatcher config");
    config = normalize(cfg);
}

/**
 * Reset Notification dispatcher configuration to default.
 *
 * Primarily useful in tests.
 */
export function resetConfig() {
    config = defaultConfig;
}

/**
 * Publish notifications to an observable channel after passing them through a chain
 * of interceptors (Refer {@link NotificationDispatcherConfig}) if configured.
 */
export async function publish<TEntity>(notifications: MaybeArray<MutationNotification<TEntity>>) {
    const intercepted = await config.intercept(checkArray(notifications) ? notifications : [notifications]);
    intercepted.forEach(config.publish);
}
