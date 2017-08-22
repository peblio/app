import * as ActionTypes from '../constants.jsx';

export function playCode(id) {
  return {
    type: ActionTypes.PLAY_CODE,
    id
  };
}

export function stopCode(id) {
  return {
    type: ActionTypes.STOP_CODE,
    id
  };
}

export function addEditor() {
  return {
    type: ActionTypes.ADD_EDITOR
  };
}
