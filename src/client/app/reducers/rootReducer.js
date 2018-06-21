import { combineReducers } from 'redux';

import editorsReducer from './editors.js';
import mainToolbar from './mainToolbar.js';
import page from './page.js';
import user from './user.js';

const rootReducer = combineReducers({
  editorsReducer,
  mainToolbar,
  page,
  user
});

export default rootReducer;
