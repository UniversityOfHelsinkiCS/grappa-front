import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import ThesisGraders from '../../../src/thesis/components/ThesisGraders';

test("renders properly", t => {
    const wrapper = shallow(
        <ThesisGraders />
    );

    t.is(wrapper.find("GradersDropdown").length, 1);    
});