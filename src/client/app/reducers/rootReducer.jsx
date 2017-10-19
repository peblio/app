import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import test from './test.jsx';
import editorContainer from './editorContainer.jsx';

const rootReducer = combineReducers({
  editorContainer,
  test
});

export default rootReducer;
