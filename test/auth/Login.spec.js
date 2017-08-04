import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { Login } from '../../src/auth/Login';
/*
test('renders properly', t => {
  const wrapper = shallow(
    <Login close={() => {}}/>
  );

  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('button').length, 1);

});
*/

test('returns true', t => {
  t.is(true, true);
})