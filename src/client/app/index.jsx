import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory} from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer.jsx';
import thunk from 'redux-thunk';

import App from './components/App.jsx';

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
));

require('./styles/sass/main.scss');

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
         <Router history={browserHistory}>
           <div>
             <Route path="/" component={App}/>
           </div>
         </Router>
      </Provider>
    );
  }
}

render(<Main/>, document.getElementById('app'));
