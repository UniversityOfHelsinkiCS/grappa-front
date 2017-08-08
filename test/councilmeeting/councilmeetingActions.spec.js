import test from 'ava';
import { actionTest } from 'redux-ava';
import { councilmeetings } from "../mockdata";

import {
    COUNCILMEETING_GET_ALL,
    COUNCILMEETING_SAVE_ONE,
    COUNCILMEETING_UPDATE_ONE,
    COUNCILMEETING_DELETE_ONE,
    getCouncilMeetings,
    saveCouncilMeeting,
    updateCouncilMeeting,
    deleteCouncilMeeting,
} from '../../src/councilmeeting/councilmeeting.actions';

test('should return the correct type for getCouncilMeetings', actionTest(
    getCouncilMeetings,
    {
        type: COUNCILMEETING_GET_ALL,
        payload: {
            request: {
                url: "/councilmeeting",
                method: "get",
                data: undefined,
            }
        }
    },
));

test('should return the correct type for saveCouncilMeeting', actionTest(
    saveCouncilMeeting,
    councilmeetings[0],
    {
        type: COUNCILMEETING_SAVE_ONE,
        flashMessage: {
            type: "warning",
            title: "Request sent",
            body: "Waiting for Councilmeeting to be saved.",
        },
        successMessage: {
            type: "success",
            title: "Success",
            body: "Councilmeeting was saved.",
        },
        payload: {
            request: {
                url: "/councilmeeting",
                method: "post",
                data: councilmeetings[0],
            }
        }
    },
));

test('should return the correct type for updateCouncilMeeting', actionTest(
    updateCouncilMeeting,
    councilmeetings[0],
    {
        type: COUNCILMEETING_UPDATE_ONE,
        flashMessage: {
            type: "warning",
            title: "Request sent",
            body: "Waiting for Councilmeeting to be updated.",
        },
        successMessage: {
            type: "success",
            title: "Success",
            body: "Councilmeeting was updated.",
        },
        payload: {
            request: {
                method: "put",
                url: "/councilmeeting/" + councilmeetings[0].id,
                data: councilmeetings[0],
            }
        }
    }
));

test('should return the correct type for deleteCouncilMeeting', actionTest(
    deleteCouncilMeeting,
    councilmeetings[0],
    {
        type: COUNCILMEETING_DELETE_ONE,
        flashMessage: {
            type: "warning",
            title: "Request sent",
            body: "Waiting for Councilmeeting to be deleted.",
        },
        successMessage: {
            type: "warning",
            title: "Success",
            body: "Councilmeeting was deleted.",
        },
        payload: {
            request: {
                method: "delete",
                url: "/councilmeeting/" + councilmeetings[0].id,
                data: councilmeetings[0],
            }
        }
    }
));
