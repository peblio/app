import * as ActionTypes from '../constants.jsx';

const initialState = {
  iframes: {},
  currentIframeId: 'iframe-0',
  indexIframe: 0
};

const iframe = (state = initialState, action) => {
  const iframes = JSON.parse(JSON.stringify(state.iframes));
  switch (action.type) {

    case ActionTypes.ADD_IFRAME:
      {
        const newIframeId = `iframe-${state.indexIframe}`;
        const newIframe = {
          id: newIframeId,
          url: '',
          x: 0,
          y: 0,
          width: 200,
          height: 50
        };
        iframes[newIframeId] = newIframe;
        return Object.assign({}, state, {
          iframes,
          indexIframe: state.indexIframe + 1,
          currentIframeId: newIframeId
        });
      }

    case ActionTypes.SET_IFRAME_URL:
      iframes[state.currentIframeId].url = action.url;
      return Object.assign({}, state, { iframes });

    case ActionTypes.SET_CURRENT_IFRAME:
      return Object.assign({}, state, { currentIframeId: action.value });

    case ActionTypes.SET_DB_IFRAMES:
      return Object.assign({}, state, {
        iframes: action.iframes,
        indexIframe: action.indexIframe
      });

    case ActionTypes.REMOVE_IFRAME:
      delete iframes[action.id];
      return Object.assign({}, state, {
        iframes
      });

    case ActionTypes.SET_IFRAME_POSITION:
      iframes[state.currentIframeId].x = action.x;
      iframes[state.currentIframeId].y = action.y;
      return Object.assign({}, state, {
        iframes
      });

    case ActionTypes.SET_IFRAME_SIZE:
      iframes[state.currentIframeId].width = action.width;
      iframes[state.currentIframeId].height = action.height;
      return Object.assign({}, state, {
        iframes
      });

    default:
      return state;
  }
};

export default iframe;
