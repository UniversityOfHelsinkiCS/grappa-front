import test from 'ava';
import { reducerTest } from 'redux-ava';
import { fromJS } from "immutable";
import { loggedInUsers, tokens } from "../mockdata";

import reducer from '../../src/auth/auth.reducer';
import {
    logoutAction,
} from '../../src/auth/auth.actions';

const initialState = fromJS({
    user: {},
    token: "",
    expires: undefined,
    loading: false,
});

const stateWithUserLoggedIn = fromJS({
    user: loggedInUsers[0],
    token: tokens[0],
    expires: 1000,
    loading: false,
});

test('login reducer', reducerTest(
    reducer,
    initialState,
    {
        type: "LOGIN_USER_SUCCESS",
        payload: {
            user: loggedInUsers[0],
            token: tokens[0],
            expires: 1000
        },
    },
    stateWithUserLoggedIn,
));

test('logout reducer', reducerTest(
    reducer,
    stateWithUserLoggedIn,
    logoutAction(),
    initialState,
));