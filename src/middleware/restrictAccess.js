import store from "../store";

/**
 * Function for redirecting un-authorized user to /login
 *
 * Called on routes on their onEnter-property when the are entered.
 * If the user hasn't been logged in he/she is redirected to the /login route.
 * Which doesn't actually work the way it's supposed to do but it's good enough.
 * Meaning that it only replaces the location-name which isn't an actual redirection.
 *
 * @param {Object} nextState - Next state of the react-router
 * @param {Object} replace - Function to replace the nextState
 */
export const redirectNonUser = (nextState, replace) => {
  const user = store.getState().get("auth").get("user").toJS();
  if (user.role === undefined) {
    replace({
      pathname: "/login",
    });
  }
};

export const redirectNonPrintPerson = (nextState, replace) => {
  const user = store.getState().get("auth").get("user").toJS();
  if (user.role !== "print-person" && user.role !== "admin") {
    replace({
      pathname: "/login",
    });
  }
};


/**
 * Function for redirecting un-authorized user from admin views
 *
 * Called on routes in their onEnter-property when they are entered.
 * If the current logged in user isn't an admin he/she is redirected
 * to the /login route. Doesn't actually work the way it's supposed to do.
 *
 * @param {Object} nextState - Next state of the react-router
 * @param {Object} replace - Function to replace the nextState
 */
export const redirectNonAdmin = (nextState, replace) => {
  // console.log("checking if admin");
  const user = store.getState().get("auth").get("user").toJS();
  if (user.role !== "admin") {
    // console.log("wasnt admin :/");
    replace({
      pathname: "/login",
    });
  }
};
