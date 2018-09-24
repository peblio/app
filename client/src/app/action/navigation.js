import axios from '../utils/axios';
import dynamicSort from '../utils/sort-function';
import * as ActionTypes from '../constants/reduxConstants.js';

export function createNavContent(layout) {
  const navContent = [];
  const sortedLayout = layout.sort(dynamicSort('y'));
  sortedLayout.forEach((element) => {
    const baseElement = document.getElementById(element.i);
    const headings = baseElement.querySelectorAll('h1, h2');
    headings.forEach((heading) => {
      // debugger;
      navContent.push({
        type: heading.localName,
        content: heading.textContent,
        id: element.i,
        y: window.pageYOffset + heading.getBoundingClientRect().y
      });
    });
  });
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CREATE_NAV_CONTENT,
      navContent
    });
  };
}
