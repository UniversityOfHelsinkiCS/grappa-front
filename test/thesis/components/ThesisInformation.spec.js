import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { theses, studyfields } from '../../mockdata';

import ThesisInformation from '../../../src/thesis/components/ThesisInformation';

test("renders properly", t => {
    const wrapper = shallow(
        <ThesisInformation thesis={theses[0]} studyFields={studyfields}/>
    );

    t.is(wrapper.find("input").length, 5);
    t.is(wrapper.find("select").length, 2);
});

test("fields change when changing fields", t => {
    const changeStub = sinon.stub();
    const wrapper = shallow(
        <ThesisInformation thesis={theses[0]} studyFields={studyfields} sendChange={changeStub}/>
    );
    
    wrapper.find("input").at(0).simulate('change', {target: {value: "eka"}});
    t.truthy(changeStub.calledOnce);
    wrapper.find("input").at(1).simulate('change', {target: {value: "toka"}});
    t.truthy(changeStub.calledTwice);
    wrapper.find("input").at(2).simulate('change', {target: {value: "kolmas"}});
    t.truthy(changeStub.calledThrice);
    wrapper.find("input").at(3).simulate('change', {target: {value: "neljäs"}});
    t.truthy(changeStub.callCount === 4);
    wrapper.find("input").at(4).simulate('change', {target: {value: "viides"}});
    t.truthy(changeStub.callCount === 5);
});

test.only("selects change when changing selects", t => {
    const changeStub = sinon.stub();
    const wrapper = mount(
        <ThesisInformation thesis={theses[0]} studyFields={studyfields} sendChange={changeStub} errors={()=>{}}/>
    );
    
    wrapper.find("select").at(0).find("option").at(1).simulate('change');
    t.truthy(changeStub.calledOnce);
    wrapper.find("select").at(1).find("option").at(1).simulate("change");
    t.truthy(changeStub.calledTwice);
})