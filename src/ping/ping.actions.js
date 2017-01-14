
export const setLogoutTimeout = () => {
  return (dispatch, getState) => {
    const current = Date.now();
    const expires = getState().toJS().auth.expires * 1000 + 1000;
    const timeoutId = setTimeout(() => {
      dispatch(pingAuth())
    }, expires - current)
    return dispatch(setTimer(timeoutId));
  };
}

export const setTimer = (timerId) => (
  {
    type: "SET_TIMER",
    payload: {
      timerId,
    }
  }
)

export const unsetTimer = () => (
  {
    type: "UNSET_TIMER",
  }
)

export const pingAuth = () => (
  {
    type: "PING_AUTH",
    payload: {
      request: {
        url: "/auth",
        method: "get",
        data: {}
      }
    }
  }
)