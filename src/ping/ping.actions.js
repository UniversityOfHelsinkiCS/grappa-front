
export const setLogoutTimeout = () => {
  return (dispatch, getState) => {
    const current = Date.now();
    const expires = getState().toJS().auth.expires * 1000;
    const interval = setInterval(() => {
      dispatch(pingAuth())
    // }, expires - current)
    }, 2000)
    return dispatch(setTimer(interval));
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
