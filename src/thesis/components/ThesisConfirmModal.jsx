import React, { Component } from "react";

export class ThesisConfirmModal extends Component {
    render() {
        if (!this.props.showModal) {
            return (<div/>);
        }
        return (
            <div id="grappaModal" className="grappa-modal show">
                <div className="grappa-modal-wrapper">
                    <div className="grappa-modal-content">
                        <div className="image content m-bot">
                            <div className="description">
                                <p>Have you remembered to add the thesis into the thesis-management system?
                                    If not please do so right away.</p>
                                <a target="_blank" href="https://ilmo.cs.helsinki.fi/gradu/servlet/hae">Ilmo (opens in a new window)</a>
                            </div>
                        </div>
                        <div className="actions">
                            <div className="one fluid ui buttons">
                                <div className="ui positive button"
                                    onClick={this.props.sendAddThesis}>
                                    Okay
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grappa-modal-righticon">
                        <i className="grappa-icon remove icon"
                            onClick={this.props.closeModal}
                        ></i>
                    </div>
                </div>
            </div>
        )
    }
};

export default ThesisConfirmModal;