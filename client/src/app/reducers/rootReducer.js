import { combineReducers } from 'redux';

import editorsReducer from './editors.js';
import mainToolbar from './mainToolbar.js';
import page from './page.js';
import profile from './profile.js';
import user from './user.js';

const rootReducer = combineReducers({
  editorsReducer,
  mainToolbar,
  page,
  profile,
  user
});

export default rootReducer;
