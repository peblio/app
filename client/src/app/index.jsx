import React from 'react';
import { Switch, Router } from 'react-router';
import { Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reduxCatch from 'redux-catch';
import axios from './utils/axios';

import rootReducer from './reducers/rootReducer.js';
import App from './components/App/App.jsx';
import Profile from './components/Profile/Profile';
import withTracker from './withTracker.jsx';
import history from './utils/history';

import './styles/Draft.css';
import './styles/reactGrid.css';
import './styles/reactResize.css';

function errorHandler(error, getState, lastAction, dispatch) {
  console.log(error);
  console.log('current state', getState());
  console.log('last action was', lastAction);
  // optionally dispatch an action due to the error using the dispatch parameter
  axios.post('/logs', {
        "message": error.message,
        "info": "ERROR",
        "stacktrace": error.stack,
        "path": "path",
        "action": lastAction.type,
        "module": "ui"
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      reduxCatch(errorHandler)
    )
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
