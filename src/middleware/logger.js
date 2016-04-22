const logger = store => next => action => {
  console.log("dispatching", action);
  next(action);
  console.log("next state", store.getState());
};

export default logger;
