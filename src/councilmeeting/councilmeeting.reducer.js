import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  councilmeetings: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "COUNCILMEETING_GET_ALL_SUCCESS":
      const sorted = action.payload.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return state.mergeIn(["councilmeetings"], fromJS(sorted));
    case "COUNCILMEETING_SAVE_ONE_SUCCESS":
      const exists = state.get("councilmeetings").find(grader => {
        return grader.get("id") === action.payload.id;
      })
      if (exists) return state;
      return state.updateIn(["councilmeetings"], list => {
        // searches for the index where the new meeting should be inserted at
        // to keep the dates in ascending order
        // returns -1 if in last position
        const index = list.findIndex(meeting => {
          if (new Date(meeting.get("date")) > new Date(action.payload.date)) {
            return meeting;
          }
        });
        return index !== -1 ? list.splice(index, 0, fromJS(action.payload)) : list.push(fromJS(action.payload));
      });
    case "COUNCILMEETING_UPDATE_ONE_SUCCESS":
      const updatedState = state.updateIn(["councilmeetings"], councilmeetings =>
        councilmeetings.map(councilmeeting => {
          if (councilmeeting.get("id") === action.payload.id) {
            return fromJS(action.payload);
          }
          return councilmeeting;
        })
      );
      return updatedState.updateIn(["councilmeetings"], councilmeetings =>
        councilmeetings.sort((a, b) => {
          return new Date(a.get("date")) - new Date(b.get("date"));
        })
      );
    case "COUNCILMEETING_DELETE_ONE_SUCCESS":
      return state.updateIn(["councilmeetings"], list =>
        list.filter(cm => {
          if (cm.get("id") !== action.payload.id) {
            return cm;
          }
        })
      );
    case "COUNCILMEETING_GET_ALL_FAILURE":
    case "COUNCILMEETING_SAVE_ONE_FAILURE":
    case "COUNCILMEETING_UPDATE_ONE_FAILURE":
    case "COUNCILMEETING_DELETE_ONE_FAILURE":
    default:
      return state;
  }
}

const sortMeetings = (meetings) => {
  return meetings.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};
