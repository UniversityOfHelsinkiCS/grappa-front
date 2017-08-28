import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import ThesisUploadWidget from '../../../src/thesis/components/ThesisUploadWidget';

test("renders properly", t => {
    const wrapper = shallow(
        <ThesisUploadWidget />
    );

    t.is(wrapper.find("Dropzone").length, 1);    
});