import { fromJS } from "immutable";
import { expect } from "chai";
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
const stateWithMoreUsers = fromJS({
  users: [...activatedUsers, activatedUsers[0]],
});

const stateWithDeletedUser = fromJS({
  users: [...notActivatedUsers.slice(1)],
});

describe("User reducer", () => {
  describe("when receiving GET_ALL_SUCCESS type of action", () => {
    it("should add the received users", () => {
      const newState = reducer(initialState, {
        type: "USER_GET_ALL_SUCCESS",
        payload: notActivatedUsers,
      });
      expect(newState).to.equal(stateWithUsers);
    });
  });
  describe("when receiving UPDATE_ONE_SUCCESS type of action", () => {
    it("should update one of the users", () => {
      const newState = reducer(stateWithUsers, {
        type: "USER_UPDATE_ONE_SUCCESS",
        payload: [1],
        sent: activatedUsers[0],
      });
      expect(newState).to.equal(stateWithUpdatedUser);
    });
  });
  describe("when receiving DELETE_ONE_SUCCESS type of action", () => {
    it("should delete one of the users", () => {
      const newState = reducer(stateWithUsers, {
        type: "USER_DELETE_ONE_SUCCESS",
        payload: [1],
        sent: notActivatedUsers[0],
      });
      expect(newState).to.equal(stateWithDeletedUser);
    });
  });
  xit("should add user to users when saving user is succesfull", () => {
    const expectedState = initialState.mergeIn(["users"],
      fromJS([activatedUsers[0]])
      );
    const newState = reducer(initialState, {
      type: "USER_SAVE_ONE_SUCCESS",
      payload: activatedUsers[0],
    });
    expect(newState).to.equal(expectedState);
  });
  xit("shouldn't remove old users when adding a user", () => {
    const newState = reducer(stateWithUsers, {
      type: "USER_SAVE_ONE_SUCCESS",
      payload: activatedUsers[0],
    });
    expect(newState).to.deep.equal(stateWithMoreUsers);
  });
  it("shouldn't change users when saving is unsuccesfull", () => {
    const newState = reducer(initialState, {
      type: "USER_SAVE_ONE_FAILURE",
      message: "asdf",
      error: "error",
    });
    expect(newState).to.equal(initialState);
  });
});
