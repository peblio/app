import { combineReducers } from 'redux';

import editors from './editors.jsx';
import mainToolbar from './mainToolbar.jsx';
import page from './page.jsx';
import user from './user.jsx';

const rootReducer = combineReducers({
  editors,
  mainToolbar,
  page,
  user
});

export default rootReducer;
