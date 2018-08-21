import React from 'react';
import { Switch, Router } from 'react-router';
import { Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.js';
import App from './components/App/App.jsx';
import Profile from './components/Profile/Profile';
import withTracker from './withTracker.jsx';
import history from './utils/history';

import './styles/Draft.css';
import './styles/reactGrid.css';
import './styles/reactResize.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route exact path="/" component={withTracker(App)} />
            <Switch>
              <Route path="/pebl" component={withTracker(App)} />
              <Route path="/reset" component={withTracker(App)} />
              <Route path="/confirmation" component={withTracker(App)} />
              <Route path="/user/:userName/folder/:folderShortId" component={withTracker(Profile)} />
              <Route path="/user/:userName" component={withTracker(Profile)} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<Main />, document.getElementById('app'));
