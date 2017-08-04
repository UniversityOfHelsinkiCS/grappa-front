import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { Registration } from '../../src/auth/Registration';

test('renders properly', t => {
  const wrapper = shallow(
    <Registration />
  );

  //Five inputs: First name, Last name, Email, Password & Confirm Password
  t.is(wrapper.find('input').length, 5);
  //One button: register
  t.is(wrapper.find('.button').length, 1);
  //One submit: Register
  t.is(wrapper.find('.submit').length, 1);
});

test('Is not sent without input', t => {
  const saveStub = sinon.stub();

  const wrapper = mount(
    <Registration saveUser={saveStub} />
  );

  wrapper.find('.button').simulate('click');
  t.falsy(saveStub.called);
});

test('Is not sent without proper email', t => {
  const saveStub = sinon.stub();

  const wrapper = mount(
    <Registration saveUser={saveStub} />
  );

  wrapper.find('input').at(0).simulate('change', {target: {value: 'Firstname'}});
  wrapper.find('input').at(1).simulate('change', {target: {value: 'Lastname'}});
  wrapper.find('input').at(2).simulate('change', {target: {value: 'clearly_not_email'}});
  wrapper.find('input').at(3).simulate('change', {target: {value: 'Password'}});
  wrapper.find('input').at(4).simulate('change', {target: {value: 'Password'}});

  wrapper.find('.button').simulate('click');
  t.falsy(saveStub.called);
});

test('Is not sent without correct confirmed password', t => {
  const saveStub = sinon.stub();

  const wrapper = mount(
    <Registration saveUser={saveStub} />
  );

  wrapper.find('input').at(0).simulate('change', {target: {value: 'Firstname'}});
  wrapper.find('input').at(1).simulate('change', {target: {value: 'Lastname'}});
  wrapper.find('input').at(2).simulate('change', {target: {value: 'email@address.fi'}});
  wrapper.find('input').at(3).simulate('change', {target: {value: 'Password'}});
  wrapper.find('input').at(4).simulate('change', {target: {value: 'Passwood'}});

  wrapper.find('.button').simulate('click');
  t.falsy(saveStub.called);
});


test('Is sent with correct input', t => {
  const saveStub = sinon.stub();

  const wrapper = mount(
    <Registration saveUser={saveStub} />
  );

  wrapper.find('input').at(0).simulate('change', {target: {value: 'Firstname'}});
  wrapper.find('input').at(1).simulate('change', {target: {value: 'Lastname'}});
  wrapper.find('input').at(2).simulate('change', {target: {value: 'email@address.fi'}});
  wrapper.find('input').at(3).simulate('change', {target: {value: 'Password'}});
  wrapper.find('input').at(4).simulate('change', {target: {value: 'Password'}});

  wrapper.find('.button').simulate('click');
  t.truthy(saveStub.calledOnce);
});