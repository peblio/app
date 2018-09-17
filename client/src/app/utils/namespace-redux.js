// reference: https://redux.js.org/recipes/structuringreducers/reusingreducerlogic#customizing-behavior-with-higher-order-reducers
export function namespaceReducer(reducerFunction, namespace) {
  return (state, action) => {
    const isInitializationCall = state === undefined;
    if (action.namespace !== namespace && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

// this utility expects each action creator to return a thunk: https://github.com/reduxjs/redux-thunk#whats-a-thunk
// reference: https://github.com/mgcrea/redux-local-scope/blob/master/src/index.js#L7
export function namespaceActionCreators(actionCreators, namespace) {
  return Object.entries(actionCreators).reduce((accum, [actionCreatorName, actionCreator]) => ({
    ...accum,
    [actionCreatorName]: (...args) => {
      const thunk = actionCreator(...args);
      return (dispatch, getState, extraArgument) => {
        const namespacedDispatch = (action) => {
          dispatch({ ...action, namespace });
        };
        return thunk(namespacedDispatch, getState, extraArgument);
      };
    }
  }), {});
}
