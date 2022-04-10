import * as ActionTypes from '../constants/reduxConstants';
import axios from '../utils/axios';

export const setTagName = tagName => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_TAG_NAME,
    tagName
  });
};

export function setTotalPebls(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_RESOURCES_TOTAL_PEBLS,
      value
    });
  };
}

export function getPeblsFromTag(value, limit, page, withStudents) {
  const tempPebls = [];
  return dispatch => axios.get(`/pages/withTags?tag=${value}&limit=${limit}&page=${page}&showStudentPages=${withStudents}`)
    .then((response) => {
      const totalNoPebls = response.data.totalDocs;
      response.data.docs.map((pebl, i) => {
        tempPebls.push({
          description: pebl.description,
          id: pebl.id,
          title: pebl.title,
          tags: pebl.tags,
          updatedAt: pebl.updatedAt,
          user: pebl.user
        });
      });
      dispatch(setTotalPebls(totalNoPebls));
      dispatch({
        type: ActionTypes.SET_RESOURCES_PEBLS,
        value: tempPebls
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
