import axios from '../utils/axios';
import dynamicSort from '../utils/sort-function';
import * as ActionTypes from '../constants/reduxConstants.js';
import * as PageDefaults from '../constants/pageConstants.js';
import history from '../utils/history';

export function createNavigationContent(layout) {
  const navContent = [];
  const sortedLayout = layout.sort(dynamicSort('y'));
  sortedLayout.forEach((element) => {
    const baseElement = document.getElementById(element.i);
    const headings = baseElement.querySelectorAll('h1, h2');
    headings.forEach((heading) => {
      navContent.push({
        type: heading.localName,
        content: heading.textContent,
        id: element.i,
        y: window.pageYOffset + heading.getBoundingClientRect().y - PageDefaults.Y_NAVIGATION_OFFSET
      });
    });
  });
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CREATE_NAVIGATION_CONTENT,
      navContent
    });
  };
}

export function openNavigationContent() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.OPEN_NAVIGATION
    });
  };
}

export function closeNavigationContent() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_NAVIGATION
    });
  };
}

export function setYNavigation(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_Y_NAVIGATION,
      value
    });
  };
}

export function setYPosition(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_Y_POSITION,
      value
    });
  };
}
