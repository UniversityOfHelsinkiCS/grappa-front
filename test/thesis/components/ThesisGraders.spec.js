import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { thesisProgresses } from '../../mockdata';

import ThesisGraders from '../../../src/thesis/components/ThesisGraders';

test("renders properly", t => {
    const wrapper = shallow(
        <ThesisEmails thesisProgress={thesisProgresses[1]}/>
    );

    t.is(wrapper.find(".checkbox").length, 5);    
});