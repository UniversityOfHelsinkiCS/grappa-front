import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  emaildrafts: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "EMAILDRAFT_GET_ALL_SUCCESS":
      return state.mergeIn(["emaildrafts"], fromJS(action.payload));
    case "EMAILDRAFT_GET_ALL_FAILURE":
      return state;
    case "EMAILDRAFT_UPDATE_ONE_SUCCESS":
      return state.updateIn(["emaildrafts"], emaildrafts =>
        emaildrafts.map(emaildraft => {
          if (emaildraft.get("id") === action.payload.id) {
            return fromJS(action.payload);
          }
          return emaildraft;
        })
      );
    case "EMAILDRAFT_CREATE_ONE_SUCCESS":
      return state.updateIn(["emaildrafts"], drafts => fromJS([...drafts, action.payload]));
    case "EMAILDRAFT_UPDATE_ONE_FAILURE":
      return state;
    default:
      return state;
  }
}
