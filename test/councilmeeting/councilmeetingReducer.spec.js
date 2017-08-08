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

test('councilmeeting get reducer', reducerTest(
    reducer,
    initialState,
    {
        type: "COUNCILMEETING_GET_ALL_SUCCESS",
        payload: [councilmeetings[0]],
    },
    stateWithMeeting,
));