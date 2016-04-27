import { fromJS } from "immutable";
import { expect } from "chai";
import {
  LOGIN_USER_SUCCESS,
  // LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from "../../src/auth/auth.actions";
import reducer from "../../src/auth/auth.reducer";
import { loggedInUsers, tokens } from "../mockdata";

const initialState = fromJS({
  user: {},
  token: "",
});

const stateWithUserLoggedIn = fromJS({
  user: loggedInUsers[0],
  token: tokens[0],
});

describe("Auth reducer", () => {
  describe("when receiving LOGIN_USER_SUCCESS type of action", () => {
    it("should update the state with the received data", () => {
      const newState = reducer(initialState, {
        type: LOGIN_USER_SUCCESS,
        payload: {
          user: loggedInUsers[0],
          token: tokens[0],
        },
      });
      expect(newState).to.equal(stateWithUserLoggedIn);
    });
  });
  describe("when receiving LOGOUT_USER type of action", () => {
    it("should return the state back to the initial state", () => {
      const newState = reducer(stateWithUserLoggedIn, {
        type: LOGOUT_USER,
      });
      expect(newState).to.equal(initialState);
    });
  });
});
