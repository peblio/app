import * as ActionTypes from '../constants.jsx';

export function addIframe() {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.ADD_IFRAME
    });
  };
}

export function setIframeURL(url) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_IFRAME_URL,
      url
    });
  };
}

export function setCurrentIframe(value) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_IFRAME,
      value
    });
  };
}

export function setDBIframes(indexIframe, iframes) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_IFRAMES,
      indexIframe,
      iframes
    });
  };
}
