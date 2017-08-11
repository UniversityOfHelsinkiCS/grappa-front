import test from 'ava';
import { reducerTest } from 'redux-ava';
import { fromJS } from "immutable";
import { councilmeetings } from "../mockdata";

import reducer from '../../src/councilmeeting/councilmeeting.reducer';

const initialState = fromJS({
    councilmeetings: [],
});

const stateWithMeeting = fromJS({
    councilmeetings: [councilmeetings[0]],
});

const stateWithMeetings = fromJS({
    councilmeetings: councilmeetings,
});

const stateWithDifferentDate = fromJS({
    councilmeetings: [councilmeetings[3]],
})

test('councilmeeting get reducer', reducerTest(
    reducer,
    initialState,
    {
        type: "COUNCILMEETING_GET_ALL_SUCCESS",
        payload: [councilmeetings[0]],
    },
    stateWithMeeting,
));

test('councilmeeting save reducer', reducerTest(
    reducer,
    initialState,
    {
        type: "COUNCILMEETING_SAVE_ONE_SUCCESS",
        payload: councilmeetings[0],
    },
    stateWithMeeting,
));

test('councilmeeting update reducer', reducerTest(
    reducer,
    stateWithMeeting,
    {
        type: "COUNCILMEETING_UPDATE_ONE_SUCCESS",
        payload: councilmeetings[3],
    },
    stateWithDifferentDate,
));

test('councilmeeting delete reducer', reducerTest(
    reducer,
    stateWithMeeting,
    {
        type: "COUNCILMEETING_DELETE_ONE_SUCCESS",
        payload: councilmeetings[0],
    },
    initialState,
));

test('failure get all', reducerTest(
    reducer,
    stateWithMeetings,
    {
        type: "COUNCILMEETING_GET_ALL_FAILURE",
        payload: councilmeetings[0],
    },
    stateWithMeetings,
));

test('failure save one', reducerTest(
    reducer,
    stateWithMeetings,
    {
        type: "COUNCILMEETING_SAVE_ONE_FAILURE",
        payload: councilmeetings[0],
    },
    stateWithMeetings,
));

test('failure update one', reducerTest(
    reducer,
    stateWithMeetings,
    {
        type: "COUNCILMEETING_UPDATE_ONE_FAILURE",
        payload: councilmeetings[0],
    },
    stateWithMeetings,
));

test('failure delete one', reducerTest(
    reducer,
    stateWithMeetings,
    {
        type: "COUNCILMEETING_DELETE_ONE_FAILURE",
        payload: councilmeetings[0],
    },
    stateWithMeetings,
));

test('default', reducerTest(
    reducer,
    stateWithMeetings,
    {
        type: "",
        payload: councilmeetings[0],
    },
    stateWithMeetings,
));