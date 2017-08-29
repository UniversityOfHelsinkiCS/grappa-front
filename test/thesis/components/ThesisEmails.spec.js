import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { thesisProgresses } from '../../mockdata';

import ThesisEmails from '../../../src/thesis/components/ThesisEmails';

test("renders properly", t => {
    const wrapper = shallow(
        <ThesisEmails thesisProgress={thesisProgresses[1]}/>
    );

    t.is(wrapper.find(".checkbox").length, 5);    
});

test("sends email", t => {
    const sendStub = sinon.stub();
    const wrapper = shallow(
        <ThesisEmails thesisProgress={thesisProgresses[1]} sendEmail={sendStub}/>
    );

    wrapper.find("button").at(0).simulate('click');
    t.truthy(sendStub.calledOnce);
    t.truthy(sendStub.calledWith('GraderEvalReminder'));
});

test("sets done", t => {
    const sendStub = sinon.stub();
    const wrapper = shallow(
        <ThesisEmails thesisProgress={thesisProgresses[1]} sendDone={sendStub}/>
    );


    wrapper.find("button").at(1).simulate('click');
    t.truthy(sendStub.calledOnce);
    t.truthy(sendStub.calledWith('GraderEvalReminder'));
});