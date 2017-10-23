import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import test from './test.jsx';
import editorContainer from './editorContainer.jsx';

const rootReducer = combineReducers({
  editorContainer
});

export default rootReducer;
