import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  notifications: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "NOTIFICATION_GET_ALL_SUCCESS":
      // immutable.js wont merge empty array to replace the old data
      if (action.payload.length === 0) {
        return state.merge(fromJS({
          notifications: []
        }));
      }
      // const notifications = action.payload;
      const notifications = action.payload.map(n => {
        n.createdAt = new Date(n.createdAt);
        return n;
      });
      notifications.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
      return state.merge(fromJS({
        notifications,
      }))
      // return state.mergeIn(["notifications"], fromJS(action.payload));
      // for notifications received through the websocket
    case "NOTIFICATION_ADD_ONE":
      return state.updateIn(["notifications"], notifications => fromJS([action.payload, ...notifications]));
    case "NOTIFICATION_SET_READ_SUCCESS":
      return state.updateIn(["notifications"], notification =>
        notification.map(notification => {
          if (action.payload.indexOf(notification.get("id")) !== -1) {
            return notification.set("hasBeenRead", true);
          }
          return notification;
        })
      );
    default:
      return state;
  }
}
