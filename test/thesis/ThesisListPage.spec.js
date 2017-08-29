import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { theses, users } from "../mockdata";

import { ThesisListPage } from '../../src/thesis/ThesisListPage';

test("renders properly", t => {
    const wrapper = shallow(
        <ThesisListPage theses={theses} user={users[0]}/>
    );

    t.is(wrapper.find("ThesisList").length, 1);
});

test("Download", t => {
    const downloadStub = sinon.stub();
    const wrapper = mount(
        <ThesisListPage theses={theses} user={users[0]} downloadTheses={downloadStub} getTheses={() => {}}/>
    )

    wrapper.find("button").at(0).simulate('click');

    t.truthy(downloadStub.calledOnce);

    t.truthy(downloadStub.calledWith({
        thesisIds: [ 1, 2, 3]
    }));
});

test("Registration request", t => {
    const updateStub = sinon.stub();
    const wrapper = mount(
        <ThesisListPage theses={theses} updateThesis={updateStub} user={users[0]} getTheses={() => {}}/>
    )

    wrapper.find("input").at(6).simulate('change');

    t.truthy(updateStub.calledOnce);
    t.is(updateStub.firstCall.args[0], 1);
    t.is(typeof(updateStub.firstCall.args[1]), "object");
});

test("Registration email", t => {
    const reminderStub = sinon.stub();
    const wrapper = mount(
        <ThesisListPage theses={theses} sendReminder={reminderStub} user={users[0]} getTheses={() => {}} />
    )

    wrapper.find("button").at(2).simulate('click');

    t.truthy(reminderStub.calledOnce);
    t.truthy(reminderStub.calledWith(1, "StudentRegistrationNotification"));
});