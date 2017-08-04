import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { Login } from '../../src/auth/Login';

test('renders properly', t => {
  const wrapper = shallow(
    <Login />
  );

  //Two inputs: Username & Password
  t.is(wrapper.find('input').length, 2);
  //One button: login
  t.is(wrapper.find('.button').length, 1);
  //Two submits: Login & reset password
  t.is(wrapper.find('.submit').length, 2);
});

test('Is not sent without input', t => {
  const loginStub = sinon.stub();

  const wrapper = mount(
    <Login loginUser={loginStub} />
  );

  wrapper.find('.button').simulate('click');
  t.falsy(loginStub.called);
});

test('Is not sent with incorrect email', t => {
  const loginStub = sinon.stub();

  const wrapper = mount(
    <Login loginUser={loginStub} />
  );

  wrapper.find('input').at(0).simulate('change', {target: {value: 'clearly_not_email'}});
  wrapper.find('input').at(1).simulate('change', {target: {value: 'Password'}});

  wrapper.find('.button').simulate('click');
  t.falsy(loginStub.called);
});

test('Is sent with correct information', t => {
    const loginStub = sinon.stub();

  const wrapper = mount(
    <Login loginUser={loginStub} />
  );

  wrapper.find('input').at(0).simulate('change', {target: {value: 'clearly@is.email'}});
  wrapper.find('input').at(1).simulate('change', {target: {value: 'Password'}});

  wrapper.find('.button').simulate('click');
  t.truthy(loginStub.calledOnce);
});