import test from 'ava';
import { actionTest } from 'redux-ava';
import { theses, thesisProgresses } from "../mockdata";

import {
    THESIS_GET_ALL,
    THESIS_SAVE_ONE,
    THESIS_UPDATE_ONE,
    THESIS_DELETE_ONE,
    THESISPROGRESS_UPDATE_ONE,
    THESIS_DOWNLOAD,
    getTheses,
    getGrades,
    deleteThesis,
    saveThesisWithReview,
    updateThesis,
    downloadTheses,
    updateThesisProgress,
} from '../../src/thesis/thesis.actions';

test('should return the correct type for getTheses', actionTest(
    getTheses,
    {
        type: THESIS_GET_ALL,
        payload: {
            request: {
                url: "/thesis",
                method: "get",
                data: {}
            }
        }
    },
));

test('should return the correct type for getGrades', actionTest(
    getGrades,
    {
        type: THESIS_GET_ALL,
        payload: {
            request: {
                url: "/thesis/grades",
                method: "get",
                data: {}
            }
        }
    },
));

test('should return the correct type for deleteThesis', actionTest(
    deleteThesis,
    theses[0].id,
    {
        type: THESIS_DELETE_ONE,
        flashMessage: {
            type: "warning",
            title: "Request sent",
            body: "Waiting for Thesis to be deleted.",
        },
        successMessage: {
            type: "warning",
            title: "Success",
            body: "Thesis was deleted.",
        },
        payload: {
            request: {
                url: `/thesis/${theses[0].id}`,
                method: "delete",
                data: {},
            }
        }
    }
));

test('should return the correct type for saveThesisWithReview', actionTest(
    saveThesisWithReview,
    theses[0],
    {
        type: THESIS_SAVE_ONE,
        flashMessage: {
            type: "warning",
            title: "Request sent",
            body: "Waiting for Thesis to be saved.",
        },
        successMessage: {
            type: "success",
            title: "Success",
            body: "Thesis and review were saved.",
        },
        payload: {
            request: {
                url: "/thesis",
                method: "post",
                data: theses[0],
            }
        }
    }
));

test('should return the correct type for updateThesis', actionTest(
    updateThesis,
    theses[1].id,
    theses[0],
    {
        type: THESIS_UPDATE_ONE,
        flashMessage: {
            type: "warning",
            title: "Request sent",
            body: "Waiting for Thesis to be updated.",
        },
        successMessage: {
            type: "success",
            title: "Success",
            body: "Thesis was updated.",
        },
        payload: {
            request: {
                method: "put",
                url: `/thesis/${theses[1].id}`,
                data: theses[0],
            }
        }
    }
));

test('should return the correct type for downloadTheses', actionTest(
    downloadTheses,
    { thesisIds: [theses[0].id, theses[1].id] },
    {
        type: THESIS_DOWNLOAD,
        flashMessage: {
            type: "warning",
            title: "Request sent",
            body: "Waiting for Theses to be combined into single PDF.",
        },
        successMessage: {
            type: "success",
            title: "Success",
            body: "Theses were generated into PDF.",
        },
        payload: {
            request: {
                url: "/thesis/pdf",
                method: "post",
                responseType: "arraybuffer",
                data: { thesisIds: [theses[0].id, theses[1].id] },
            }
        }
    }
));

test('should return the correct type for updateThesisProgress', actionTest(
    updateThesisProgress,
    thesisProgresses[0],
    {
        type: THESISPROGRESS_UPDATE_ONE,
        flashMessage: {
          type: "warning",
          title: "Request sent",
          body: "Waiting for ThesisProgress to be updated.",
        },
        successMessage: {
          type: "success",
          title: "Success",
          body: "ThesisProgress was updated.",
        },
        payload: {
          request: {
            url: `/thesisprogress/${thesisProgresses[0].id}`,
            method: "put",
            data: thesisProgresses[0],
          }
        }
      }
));