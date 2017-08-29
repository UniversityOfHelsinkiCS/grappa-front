import test from 'ava';
import { reducerTest } from 'redux-ava';
import { fromJS } from "immutable";
import { theses, thesisProgresses, councilmeetings, emailDrafts } from "../mockdata";

import reducer from '../../src/thesis/thesis.reducer';

const initialState = fromJS({
    theses: [],
});

const stateWithThesis = fromJS({
    theses: [theses[0]],
});

const stateWithTheses = fromJS({
    theses: theses,
});

const stateWithDifferentThesis = fromJS({
    theses: [{ ...theses[1], id: theses[0].id }],
});

const stateWithThesisInDifferentCouncilmeeting = fromJS({
    theses: [{ ...theses[0], CouncilMeeting: councilmeetings[1], CouncilMeetingId: councilmeetings[1].id }],
});

const stateWithThesisWithDifferentThesisprogress = fromJS({
    theses: [{ ...theses[0], ThesisProgress: thesisProgresses[1] }]
});

const stateWithThesisWithEmailInThesisprogress = fromJS({
    theses: [{ ...theses[0], ThesisProgress: thesisProgresses[3] }]
});

test('thesis get reducer', reducerTest(
    reducer,
    initialState,
    {
        type: "THESIS_GET_ALL_SUCCESS",
        payload: theses,
    },
    stateWithTheses,
));

test('thesis save reducer', reducerTest(
    reducer,
    initialState,
    {
        type: "THESIS_SAVE_ONE_SUCCESS",
        payload: theses[0],
    },
    stateWithThesis,
));

test('thesis update reducer', reducerTest(
    reducer,
    stateWithThesis,
    {
        type: "THESIS_UPDATE_ONE_SUCCESS",
        payload: { ...theses[1], id: theses[0].id },
    },
    stateWithDifferentThesis,
));

test('thesis move reducer', reducerTest(
    reducer,
    stateWithThesis,
    {
        type: "THESIS_MOVE_SUCCESS",
        payload: {
            thesisIds: [theses[0].id],
            CouncilMeetingId: councilmeetings[1].id,
            CouncilMeeting: councilmeetings[1]
        },
    },
    stateWithThesisInDifferentCouncilmeeting,
));

test('thesisprogress update reducer', reducerTest(
    reducer,
    stateWithThesis,
    {
        type: "THESISPROGRESS_UPDATE_STATUS",
        payload: {
            thesisIds: [theses[0].id],
            status: "studentNotificationSent",
        },
    },
    stateWithThesisWithDifferentThesisprogress,
));

test('reminder send reducer', reducerTest(
    reducer,
    stateWithThesis,
    {
        type: "SEND_REMINDER_SUCCESS",
        payload: { ...emailDrafts[1], ThesisId: theses[0].id }
    },
    stateWithThesisWithEmailInThesisprogress,
));