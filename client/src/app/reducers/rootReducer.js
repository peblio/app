import { combineReducers } from 'redux';

import editorsReducer from './editors.js';
import mainToolbar from './mainToolbar.js';
import navigation from './navigation.js';
import page from './page.js';
import preferences from './preferences.js';
import profile from './profile.js';
import user from './user.js';

const rootReducer = combineReducers({
  editorsReducer,
  mainToolbar,
  navigation,
  page,
  preferences,
  profile,
  user
});

export default rootReducer;
