import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import ThesisConfirmModal from '../../../src/thesis/components/ThesisConfirmModal';

test("renders properly", t => {
    const wrapper = shallow(
        <ThesisConfirmModal showModal={true}/>
    );

    t.is(wrapper.find(".button").length, 1);
});


test("renders properly", t => {
    const wrapper = shallow(
        <ThesisConfirmModal showModal={false}/>
    );

    t.is(wrapper.find(".button").length, 0);
    t.truthy(wrapper.debug().length < 10);
});

test("send addthesis", t => {
    const sendStub = sinon.stub();
    const wrapper = shallow(
      <ThesisConfirmModal showModal={true} sendAddThesis={sendStub} />  
    );

    wrapper.find(".button").simulate('click');
    t.truthy(sendStub.calledOnce);
});

test("close modal", t => {
    const closeStub = sinon.stub();
    const wrapper = shallow(
        <ThesisConfirmModal showModal={true} closeModal={closeStub} />
    );

    wrapper.find("i").simulate('click');

    t.truthy(closeStub.calledOnce);
})
