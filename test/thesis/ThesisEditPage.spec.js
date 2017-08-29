import React from "react";
import test from 'ava';
import sinon from 'sinon';
import { Provider } from "react-redux";
import { mount, shallow } from 'enzyme';
import { users, studyfields } from '../mockdata';

import { ThesisEditPage } from '../../src/thesis/ThesisEditPage';

test("renders properly for admin", t => {
    const wrapper = shallow(
        <ThesisEditPage user={users[0]} />
    );

    t.is(wrapper.find("ThesisConfirmModal").length, 0);
    t.is(wrapper.find("ThesisCouncilMeetingPicker").length, 1);
    t.is(wrapper.find("ThesisEmails").length, 1);
    t.is(wrapper.find("ThesisGraders").length, 1);
    t.is(wrapper.find("ThesisInformation").length, 1);
    t.is(wrapper.find("ThesisUploadWidget").length, 0);
    t.is(wrapper.find("Connect(GraderListCreateUpdate)").length, 0);
});

test("renders properly for professor", t => {
    const wrapper = shallow(
        <ThesisEditPage user={users[1]} />
    );

    t.is(wrapper.find("ThesisConfirmModal").length, 0);
    t.is(wrapper.find("ThesisCouncilMeetingPicker").length, 1);
    t.is(wrapper.find("ThesisEmails").length, 0);
    t.is(wrapper.find("ThesisGraders").length, 1);
    t.is(wrapper.find("ThesisInformation").length, 1);
    t.is(wrapper.find("ThesisUploadWidget").length, 0);
    t.is(wrapper.find("Connect(GraderListCreateUpdate)").length, 0);
});


test("renders properly for printperson", t => {
    const wrapper = shallow(
        <ThesisEditPage user={users[2]} />
    );

    t.is(wrapper.find("ThesisConfirmModal").length, 0);
    t.is(wrapper.find("ThesisCouncilMeetingPicker").length, 1);
    t.is(wrapper.find("ThesisEmails").length, 0);
    t.is(wrapper.find("ThesisGraders").length, 1);
    t.is(wrapper.find("ThesisInformation").length, 1);
    t.is(wrapper.find("ThesisUploadWidget").length, 0);
    t.is(wrapper.find("Connect(GraderListCreateUpdate)").length, 0);
});