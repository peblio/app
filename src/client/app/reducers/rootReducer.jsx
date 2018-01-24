import { combineReducers } from 'redux';

import editors from './editors.jsx';
import mainToolbar from './mainToolbar.jsx';
import p5files from './p5files.jsx';
import page from './page.jsx';
import user from './user.jsx';

const rootReducer = combineReducers({
  editors,
  mainToolbar,
  p5files,
  page,
  user
});

export default rootReducer;
