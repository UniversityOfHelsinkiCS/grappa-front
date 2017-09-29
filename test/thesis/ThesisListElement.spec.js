import React from "react";
import { Link } from "react-router";
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
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

test("renders properly for admin", t => {
    const wrapper = shallow(
        <ThesisListElement userRole={"admin"} thesis={theses[0]} />
    );

    t.is(wrapper.find(".button").length, 1);

    t.is(wrapper.find(".checkbox").length, 5);

    t.is(wrapper.findWhere(node => node.text().indexOf(theses[0].title) !== -1).length, 1)
});

test("renders properly for non-admin", t => {
    const wrapper = shallow(
        <ThesisListElement userRole={"professor"} thesis={theses[0]} />
    );

    t.is(wrapper.find(".button").length, 0);

    t.is(wrapper.find(".checkbox").length, 4);

    t.is(wrapper.findWhere(node => node.text().indexOf(theses[0].title) !== -1).length, 1)
});

test("selecting works correctly", t => {

    let selected = false;

    const select = () => {
        selected = !selected;
    }

    const wrapper = shallow(
        <ThesisListElement thesis={theses[0]} selected={selected}
            selectThesis={select} />
    );

    t.is(selected, false);
    wrapper.find("input").at(3).simulate('change');
    t.is(selected, true);
});

test("register request and done", t => {
    const sendStub = sinon.stub();
    const toggleStub = sinon.stub();
    const wrapper = shallow(
        <ThesisListElement 
            userRole={"admin"}
            thesis={theses[0]}
            sendStudentNotification={sendStub}
            toggleRegistrationRequest={toggleStub} />
    );

    t.truthy(toggleStub.notCalled);
    wrapper.find("input").at(4).simulate('change');
    t.truthy(sendStub.notCalled);
    t.truthy(toggleStub.calledOnce);
    wrapper.find("button").simulate('click');
    t.truthy(sendStub.calledOnce);
});