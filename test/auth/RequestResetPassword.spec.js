import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { RequestResetPassword } from '../../src/auth/RequestResetPassword';

test('renders properly', t => {
    const wrapper = shallow(
        <RequestResetPassword />
    );

    //One input: Email
    t.is(wrapper.find('input').length, 1);
    //One button: send
    t.is(wrapper.find('.button').length, 1);
    //One submit: send
    t.is(wrapper.find('.submit').length, 1);
});


test('Is not sent without proper email', t => {
    const requestStub = sinon.stub();

    const wrapper = mount(
        <RequestResetPassword requestPasswordResetion={requestStub} />
    );

    wrapper.find('input').simulate('change', { target: { value: 'clearly_not_email' } });

    wrapper.find('.button').simulate('click');
    t.falsy(requestStub.called);
});


test('Is sent with proper email', t => {
    const requestStub = sinon.stub();

    const wrapper = mount(
        <RequestResetPassword requestPasswordResetion={requestStub} />
    );

    wrapper.find('input').simulate('change', { target: { value: 'clearly@good.email' } });

    wrapper.find('.button').simulate('click');
    t.truthy(requestStub.calledOnce);
});