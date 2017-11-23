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
