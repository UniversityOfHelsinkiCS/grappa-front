import { fromJS } from "immutable";
import { expect } from "chai";
import {
  USER_GET_ALL_SUCCESS,
  // USER_GET_ALL_FAILURE,
  USER_UPDATE_ONE_SUCCESS,
  // USER_UPDATE_ONE_FAILURE,
  USER_DELETE_ONE_SUCCESS,
  // USER_DELETE_ONE_FAILURE,
} from "../../src/user/user.actions";
import reducer from "../../src/user/user.reducer";
import { activatedUsers, notActivatedUsers } from "../mockdata";

const initialState = fromJS({
  users: [],
});

const stateWithUsers = fromJS({
  users: notActivatedUsers,
});

const stateWithUpdatedUser = fromJS({
  users: [activatedUsers[0], ...notActivatedUsers.slice(1)],
});

const stateWithDeletedUser = fromJS({
  users: [...notActivatedUsers.slice(1)],
});

describe("User reducer", () => {
  describe("when receiving GET_ALL_SUCCESS type of action", () => {
    it("should add the received users", () => {
      const newState = reducer(initialState, {
        type: USER_GET_ALL_SUCCESS,
        payload: notActivatedUsers,
      });
      expect(newState).to.equal(stateWithUsers);
    });
  });
  describe("when receiving UPDATE_ONE_SUCCESS type of action", () => {
    it("should update one of the users", () => {
      const newState = reducer(stateWithUsers, {
        type: USER_UPDATE_ONE_SUCCESS,
        payload: [1],
        sent: activatedUsers[0],
      });
      expect(newState).to.equal(stateWithUpdatedUser);
    });
  });
  describe("when receiving DELETE_ONE_SUCCESS type of action", () => {
    it("should delete one of the users", () => {
      const newState = reducer(stateWithUsers, {
        type: USER_DELETE_ONE_SUCCESS,
        payload: [1],
        sent: notActivatedUsers[0],
      });
      expect(newState).to.equal(stateWithDeletedUser);
    });
  });
});
