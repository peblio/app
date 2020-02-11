import React, { Suspense, lazy } from 'react';
import { Switch, Router } from 'react-router';
import { Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reduxCatch from 'redux-catch';
import { saveErrorLog } from './utils/log';

import rootReducer from './reducers/rootReducer.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import PaymentPage from './components/Payment/PaymentPage.jsx';
import Profile from './components/Profile/Profile.jsx';
import Page404 from './components/Page404/Page404.jsx';
import withTracker from './withTracker.jsx';
import LoadingMessage from './LoadingMessage.jsx';
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

const LazyLoadedApp = lazy(() => (
  import('./components/App/App.jsx')
));


class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={<LoadingMessage />}>
            <Switch>
              <Route exact path="/" component={LazyLoadedApp} />
              <Route path="/pebl/:id" component={LazyLoadedApp} />
              <Route path="/reset" component={LazyLoadedApp} />
              <Route path="/confirmation" component={LazyLoadedApp} />
              <Route path="/dashboard/:userName/folder/:folderShortId" component={withTracker(Dashboard)} />
              <Route path="/dashboard/" component={withTracker(Dashboard)} />
              <Route path="/payment/" component={withTracker(PaymentPage)} />
              <Route path="/profile/:userName/folder/:folderShortId" component={withTracker(Profile)} />
              <Route path="/profile/:userName" component={withTracker(Profile)} />
              <Route path="*" component={withTracker(Page404)} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

render(<Main />, document.getElementById('app'));
