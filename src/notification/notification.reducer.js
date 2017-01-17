import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  notifications: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "NOTIFICATION_GET_ALL_SUCCESS":
      // god damn immutable.js, wont merge empty array to replace the old data X_X
      // scour.js could be better?
      if (action.payload.length === 0) {
        return state.merge(fromJS({
          notifications: []
        }));
      }
      return state.mergeIn(["notifications"], fromJS(action.payload));
    // for notifications received through the websocket
    case "NOTIFICATION_ADD_ONE":
      return state.updateIn(["notifications"], notifications => fromJS([...notifications, action.payload]));
      // return state.updateIn(["notifications"], notifications => [...notifications, fromJS(action.payload)]);
    case "NOTIFICATION_SET_READ_SUCCESS":
      return state.updateIn(["notifications"], notification =>
        notification.map(notification => {
          if (notification.get("id") === action.payload.id) {
            return fromJS(action.payload);
          }
          return notification;
        })
      );
    default:
      return state;
  }
}
