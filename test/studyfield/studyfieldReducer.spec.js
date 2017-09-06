import test from 'ava';
import { reducerTest } from 'redux-ava';
import { fromJS } from "immutable";
import { studyfields } from "../mockdata";

import reducer from '../../src/studyfield/studyfield.reducer';

const initialState = fromJS({
    studyfields: [],
});

const stateWithStudyfield = fromJS({
    studyfields: [studyfields[0]],
});

const stateWithStudyfields = fromJS({
    studyfields: studyfields,
});

test('studyfield delete reducer', reducerTest(
    reducer,
    stateWithStudyfield,
    {
        type: "STUDYFIELD_DELETE_ONE_SUCCESS",
        payload: { id: studyfields[0].id },
    },
    initialState,
));
