import React from 'react';
import { Switch, Router } from 'react-router';
import { Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reduxCatch from 'redux-catch';
import { saveErrorLog } from './utils/log';

import rootReducer from './reducers/rootReducer.js';
import App from './components/App/App.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import FullScreen from './pages/FullScreen/FullScreen.jsx';
import Profile from './components/Profile/Profile.jsx';
import Page404 from './pages/Page404/Page404.jsx';
import withTracker from './withTracker.jsx';
import history from './utils/history';

import './styles/Draft.css';
import './styles/reactGrid.css';
import './styles/reactResize.css';

function errorHandler(error, getState, lastAction, dispatch) {
  saveErrorLog(error, getState, lastAction, 'ERROR');
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
            <Switch>
              <Route exact path="/" component={withTracker(App)} />
              <Route path="/fullscreen/:id" component={withTracker(FullScreen)} />
              <Route path="/pebl/:id" component={withTracker(App)} />
              <Route path="/reset" component={withTracker(App)} />
              <Route path="/confirmation" component={withTracker(App)} />
              <Route path="/dashboard/:userName/folder/:folderShortId" component={withTracker(Dashboard)} />
              <Route path="/dashboard/" component={withTracker(Dashboard)} />
              <Route path="/profile/:userName/folder/:folderShortId" component={withTracker(Profile)} />
              <Route path="/profile/:userName" component={withTracker(Profile)} />
              <Route path="*" component={withTracker(Page404)} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<Main />, document.getElementById('app'));
