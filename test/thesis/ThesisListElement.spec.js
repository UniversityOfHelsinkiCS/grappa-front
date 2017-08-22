import React from "react";
import { Link } from "react-router";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { theses } from "../mockdata";

import { ThesisListElement } from '../../src/thesis/ThesisListElement';

/*
<ThesisListElement
    thesis={thesis}
    selected={this.state.selectedThesesIds.includes(thesis.id)}
    selectThesis={this.selectThesis}
    sendStudentNotification={this.sendStudentNotification}
    toggleRegistrationRequest={this.toggleRegistrationRequest}
*/

test("renders properly", t => {
    const wrapper = shallow(
        <ThesisListElement thesis={theses[0]}/>
    );

    t.is(wrapper.find(".button").length, 1);

    t.is(wrapper.find(".checkbox").length, 5);

    //console.log(wrapper.debug());
})