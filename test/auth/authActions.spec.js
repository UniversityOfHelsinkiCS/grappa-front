import test from 'ava';
import { actionTest } from 'redux-ava';

import {
    LOGIN_USER,
    LOGOUT_USER,
    SEND_NEW_PASSWORD,
    loginAction,
    logoutAction,
} from '../../src/auth/auth.actions';

const email = "taysin@hyva.email";
const password = "password";

test('should return the correct type for loginAction', actionTest(
    loginAction,
    email,
    password,
    {
        type: LOGIN_USER,
        payload: {
            request: {
                url: "/login",
                method: "post",
                data: {
                    email,
                    password
                }
            }
        }
    },
));

test('should return the correct type for logoutAction', actionTest(
    logoutAction,
    { type: LOGOUT_USER },
));