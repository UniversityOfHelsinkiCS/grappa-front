import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { Provider } from "react-redux";
import { mount, shallow } from 'enzyme';
import { users, studyfields } from '../mockdata';

import { ThesisCreatePage } from '../../src/thesis/ThesisCreatePage';

test("renders properly for admin", t => {
    const wrapper = shallow(
        <ThesisCreatePage user={users[0]} />
    );

    t.is(wrapper.find("ThesisConfirmModal").length, 1);
    t.is(wrapper.find("ThesisCouncilMeetingPicker").length, 1);
    t.is(wrapper.find("ThesisEmails").length, 0);
    t.is(wrapper.find("ThesisGraders").length, 1);
    t.is(wrapper.find("ThesisInformation").length, 1);
    t.is(wrapper.find("ThesisUploadWidget").length, 1);
    t.is(wrapper.find("Connect(GraderListCreateUpdate)").length, 1);
});

test("renders properly for professor", t => {
    const wrapper = shallow(
        <ThesisCreatePage user={users[1]} />
    );

    t.is(wrapper.find("ThesisConfirmModal").length, 1);
    t.is(wrapper.find("ThesisCouncilMeetingPicker").length, 1);
    t.is(wrapper.find("ThesisEmails").length, 0);
    t.is(wrapper.find("ThesisGraders").length, 1);
    t.is(wrapper.find("ThesisInformation").length, 1);
    t.is(wrapper.find("ThesisUploadWidget").length, 1);
    t.is(wrapper.find("Connect(GraderListCreateUpdate)").length, 1);
});


test("renders properly for printperson", t => {
    const wrapper = shallow(
        <ThesisCreatePage user={users[2]} />
    );

    t.is(wrapper.find("ThesisConfirmModal").length, 1);
    t.is(wrapper.find("ThesisCouncilMeetingPicker").length, 1);
    t.is(wrapper.find("ThesisEmails").length, 0);
    t.is(wrapper.find("ThesisGraders").length, 1);
    t.is(wrapper.find("ThesisInformation").length, 1);
    t.is(wrapper.find("ThesisUploadWidget").length, 1);
    t.is(wrapper.find("Connect(GraderListCreateUpdate)").length, 0);
});