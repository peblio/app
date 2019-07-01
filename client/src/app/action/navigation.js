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

export function loadHistoryForPage(id) {
  return (dispatch) => {
    axios.get(`/pagesversion?id=${id}`)
      .then(({ data }) => dispatch({
        type: ActionTypes.LOAD_NAVIGATION_HISTORY,
        data
      }))
      .catch((e) => {
        if (e.response.status === 404) {
          history.push('/404');
        }
      });
  };
}

export function loadPageVersion(id, versionId) {
  return (dispatch) => {
    axios.get(`/pagesversion?id=${id}&version=${versionId}`)
      .then(({ data }) => dispatch({
        type: ActionTypes.SETUP_PAGE_HISTORY,
        data
      }))
      .catch((e) => {
        if (e.response.status === 404) {
          history.push('/404');
        }
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
