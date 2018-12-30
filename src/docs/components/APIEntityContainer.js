import React from "react";
import Collapsible from "react-collapsible";
import JSONTree from "react-json-tree";
import Table from "react-table";
import { getAPIName } from "../utils/api";

import "../styles/collapsible.css";
import "react-table/react-table.css";

// https://github.com/reduxjs/redux-devtools/blob/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes/default.js
const theme = {
    scheme: "default",
    author: "chris kempson (http://chriskempson.com)",
    base00: "#181818",
    base01: "#282828",
    base02: "#383838",
    base03: "#585858",
    base04: "#b8b8b8",
    base05: "#d8d8d8",
    base06: "#e8e8e8",
    base07: "#f8f8f8",
    base08: "#ab4642",
    base09: "#dc9656",
    base0A: "#f7ca88",
    base0B: "#a1b56c",
    base0C: "#86c1b9",
    base0D: "#7cafc2",
    base0E: "#ba8baf",
    base0F: "#a16946",
};

export default class APIEntityContainer extends React.Component {
    containerRef = React.createRef();

    // componentDidMount() {
    //     this.bringToView();
    // }
    // componentDidUpdate() {
    //     this.bringToView();
    // }
    //
    // bringToView() {
    //     if (this.props.activeEntityName && this.props.entity.name === this.props.activeEntityName) {
    //         this.containerRef.current.scrollIntoView();
    //     }
    // }

    render() {
        const { entity, activeEntityName } = this.props;
        return (
            <div ref={this.containerRef}>
                <style jsx>{`
                    .api-section {
                        margin: 10px;
                    }
                    .api-section header {
                        border: 1px solid #e4e4e4;
                        border-radius: 4px;
                    }
                `}</style>
                {!entity.parent && (
                    <div>
                        {entity.kindString && (
                            <div style={{ float: "right", color: "silver" }}>({entity.kindString})</div>
                        )}
                        <h1>{getAPIName(entity)}</h1>
                    </div>
                )}
                {entity.comment &&
                    entity.comment.shortText && (
                        <section className="api-section">
                            <header>Description</header>
                            <p>{entity.comment.shortText}</p>
                        </section>
                    )}
                {entity.type && (
                    <section className="api-section">
                        <header>Type</header>
                        <JSONTree data={entity.type} theme={theme} />
                    </section>
                )}
                {entity.signatures &&
                    entity.signatures.map(sig => (
                        <>
                            {sig.comment &&
                                sig.comment.shortText && (
                                    <section className="api-section">
                                        <header>Description</header>
                                        <p>{sig.comment.shortText}</p>
                                    </section>
                                )}
                            {sig.parameters &&
                                sig.parameters.length > 0 && (
                                    <section className="api-section">
                                        <header>Parameters</header>
                                        <Table
                                            showPagination={false}
                                            resizable={false}
                                            sortable={false}
                                            defaultPageSize={sig.parameters.length}
                                            columns={[
                                                {
                                                    Header: "Parameter",
                                                    accessor: "name",
                                                },
                                                {
                                                    Header: "Type",
                                                    accessor: "type",
                                                    Cell: props => <JSONTree data={props.value} theme={theme} />,
                                                },
                                                {
                                                    Header: "Description",
                                                    accessor: "comment.text",
                                                },
                                            ]}
                                            data={sig.parameters}
                                        />
                                    </section>
                                )}
                        </>
                    ))}
                {entity.children && (
                    <section className="api-section">
                        <header>Members</header>
                        <div style={{ paddingLeft: "5px", borderLeft: "4px solid #ddd", paddingRight: "0" }}>
                            {entity.children.map(e => (
                                <Collapsible
                                    trigger={
                                        <div>
                                            {e.kindString && (
                                                <div style={{ float: "right", color: "silver" }}>({e.kindString})</div>
                                            )}
                                            {getAPIName(e)}
                                        </div>
                                    }
                                    open={activeEntityName && e.name === activeEntityName}
                                >
                                    <APIEntityContainer entity={e} activeEntityName={activeEntityName} />
                                </Collapsible>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        );
    }
}
