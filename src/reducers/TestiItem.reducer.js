import {
  TESTIITEM_GET_ALL_REQUEST,
  TESTIITEM_GET_ALL_SUCCESS,
  TESTIITEM_GET_ALL_FAILURE,
  TESTIITEM_SAVE_ONE_REQUEST,
  TESTIITEM_SAVE_ONE_SUCCESS,
  TESTIITEM_SAVE_ONE_FAILURE,
} from "../actions/testiItem.actions";

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case: TESTIITEM_SAVE_ONE_REQUEST:
      return state.merge({
        inProgress: true,
        isError: false,
      });
    case: TESTIITEM_SAVE_ONE_SUCCESS:
      return state.merge({
        inProgress: false,
        isError: false,
      });
    case: TESTIITEM_SAVE_ONE_FAILURE:
      return state.merge({
        inProgress: false,
        isError: true,
      });
    default:
     return state;
  }
}
/*
const emptyMap = fromJS({});

const addRequest = (state = emptyMap, action) => {
  switch (action.type) {
    case TESTIITEM_GET_ALL_REQUEST:
      return state.delete('errorMessages').merge({
        inProgress: true,
        isError: false,
      });
    case TESTIITEM_GET_ALL_SUCCESS:
      return state.merge({
        inProgress: false,
        isError: false,
        isCreated: true,
      });
    case TESTIITEM_GET_ALL_FAILURE:
      return state.merge({
        inProgress: false,
        isError: true,
        errorMessages: action.payload,
      });
    case TESTIITEM_GET_ALL_RESET:
      return emptyMap;
    default:
      return state;
  }
};

const entries = (state = emptyMap, action) => {
  const { payload } = action;
  switch (action.type) {
  case EXERCISES_SUCCESS:
    return state.merge(Map(payload.map(item => [item.id, fromJS(item)])));
  case EXERCISES_ADD_SUCCESS:
  case EXERCISES_SINGLE_SUCCESS:
    return state.set(payload.id, fromJS(payload));
  default:
    return state;
  }
};

const INITIAL_STATE = {
  type: "INITIAL_STATE",
  isFetching: false,
  isError: false,
  entries: {},
  addRequest: {},
}

export default function (state = INITIAL_STATE, action) {
  const { type } = action;

  switch (type) {
  case EXERCISES_REQUEST:
  case EXERCISES_SINGLE_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case EXERCISES_SUCCESS:
  case EXERCISES_SINGLE_SUCCESS:
    return state.mergeDeep({
      isFetching: false,
      isError: false,
      entries: entries(state.get('entries'), action),
    });
  case EXERCISES_FAILURE:
  case EXERCISES_SINGLE_FAILURE:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  case EXERCISES_ADD_SUCCESS:
    return state.merge({
      entries: entries(state.get('entries'), action),
      addRequest: addRequest(state.get('addRequest'), action),
    });
  case EXERCISES_ADD_REQUEST:
  case EXERCISES_ADD_FAILURE:
  case EXERCISES_ADD_RESET:
    return state.merge({
      addRequest: addRequest(state.get('addRequest'), action),
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
*/