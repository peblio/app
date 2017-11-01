import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import editorContainer from './editorContainer.jsx';
import textEditors from './textEditors.jsx';
import mainToolbar from './mainToolbar.jsx';

const rootReducer = combineReducers({
  editorContainer,
  textEditors,
  mainToolbar
});

export default rootReducer;
