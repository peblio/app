import axios from '../utils/axios';
import dynamicSort from '../utils/sort-function';
import * as ActionTypes from '../constants/reduxConstants.js';

export function createNavContent(layout) {
  const sortedLayout = layout.sort(dynamicSort('y'));
  sortedLayout.forEach((element) => {
    const baseElement = document.getElementById(element.i);
    console.log(baseElement.querySelectorAll('h1, h2'));
  });
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CREATE_NAV_CONTENT
    });
  };
}

export function updateNavContent(layout) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_NAV_CONTENT,
      value
    });
  };
}
