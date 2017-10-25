import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import test from './test.jsx';
import editorContainer from './editorContainer.jsx';
import textEditors from './textEditors.jsx';

const rootReducer = combineReducers({
  editorContainer,
  textEditors
});

export default rootReducer;
