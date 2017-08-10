import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { emailDrafts } from '../mockdata';


import { EmailDraftPage } from '../../src/email/EmailDraftPage';

test('renders properly', t => {
    const wrapper = shallow(
        <EmailDraftPage />
    );

    t.is(wrapper.find('EmailDraftList').length, 1);
});

test('Child button add works', t => {
    const addStub = sinon.stub();
    const wrapper = mount(
        <EmailDraftPage createEmailDraft={addStub} EmailDrafts={emailDrafts} />
    );

    wrapper.find("input").at(2).simulate('change', { target: { value: "aNewDraft" } });
    wrapper.find(".button").at(2).simulate('click');
});

test('Child button update works', t => {
    const updateStub = sinon.stub();
    const wrapper = mount(
        <EmailDraftPage updateEmailDraft={updateStub} EmailDrafts={emailDrafts} />
    );
    wrapper.find('.button').at(0).simulate('click');
    wrapper.find('.button').at(0).simulate('click');
    t.truthy(updateStub.calledOnce);
});

test('Child button delete works', t => {
    const deleteStub = sinon.stub();
    const wrapper = mount(
        <EmailDraftPage deleteEmailDraft={deleteStub} EmailDrafts={emailDrafts} />
    );

    wrapper.find('.button').at(0).simulate('click');
    wrapper.find('.button').at(2).simulate('click');
    //It shouldn't delete when first pressed.
    t.falsy(deleteStub.calledOnce);
    wrapper.find('.button').at(2).simulate('click');
    t.truthy(deleteStub.calledOnce);
});