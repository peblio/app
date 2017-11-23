import * as ActionTypes from '../constants.jsx';
const initialState = {
  iframes: {},
  currentIframeId: 'iframe-0',
  indexIframe: 0
}

const iframe = (state = initialState, action) => {
  let iframes = JSON.parse(JSON.stringify(state.iframes));
  switch (action.type) {

    case ActionTypes.ADD_IFRAME:
      let newIframeId = 'iframe-' + state.indexIframe;
      let newIframe = {
        id: newIframeId,
        url:''
      };
      iframes[newIframeId]= newIframe;
      return Object.assign({}, state, {
        iframes: iframes,
        indexIframe: state.indexIframe + 1,
        currentIframeId: newIframeId
      });

    case ActionTypes.SET_IFRAME_URL:
      iframes[state.currentIframeId].url = action.url;
      return Object.assign({}, state, { iframes: iframes })

    default:
      return state;
  }
};

export default iframe;
