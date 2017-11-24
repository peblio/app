import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import editorContainer from './editorContainer.jsx';
import iframe from './iframe.jsx';
import mainToolbar from './mainToolbar.jsx';
import textEditors from './textEditors.jsx';
import user from './user.jsx';

const rootReducer = combineReducers({
  editorContainer,
  iframe,
  mainToolbar,
  textEditors,
  user
});

export default rootReducer;
