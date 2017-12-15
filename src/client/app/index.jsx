import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.jsx';
import App from './components/App.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';

const store = createStore(
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
            <Route exact path="/" component={App} />
            <Route path="/page" component={App} />
            <Route exact path="/pages" component={App} />
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<Main />, document.getElementById('app'));
