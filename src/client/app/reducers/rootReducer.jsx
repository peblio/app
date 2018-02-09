import { combineReducers } from 'redux';

import editorsReducer from './editors.jsx';
import mainToolbar from './mainToolbar.jsx';
import page from './page.jsx';
import user from './user.jsx';

const rootReducer = combineReducers({
  editorsReducer,
  mainToolbar,
  page,
  user
});

export default rootReducer;
