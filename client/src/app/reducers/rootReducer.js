import { combineReducers } from 'redux';

import dashboard from './dashboard.js';
import editorsReducer from './editors.js';
import mainToolbar from './mainToolbar.js';
import navigation from './navigation.js';
import page from './page.js';
import pageVersion from './pageVersion.js';
import preferences from './preferences.js';
import profile from './profile.js';
import user from './user.js';
import workspace from './workspace.js';
import classroom from './classroom';

const rootReducer = combineReducers({
  dashboard,
  editorsReducer,
  mainToolbar,
  navigation,
  page,
  pageVersion,
  preferences,
  profile,
  user,
  workspace,
  classroom
});

export default rootReducer;
