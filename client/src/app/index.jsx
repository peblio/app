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
import withTracker from './withTracker.jsx';
import LoadingMessage from './components/GenericLoader/LoadingMessage.jsx';
import history from './utils/history';

import './styles/Draft.css';
import './styles/reactGrid.css';
import './styles/reactResize.css';
import { fetchCurrentUserForAppStartUp } from './action/user';

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

const LazyLoadedPaymentPage = lazy(() => (
  import('./components/Payment/PaymentPage.jsx')
));

const LazyLoadedPaymentProfile = lazy(() => (
  import('./components/Profile/Profile.jsx')
));

const LazyLoadedPage404 = lazy(() => (
  import('./components/Page404/Page404.jsx')
));

const LazyLoadedClassRoom = lazy(() => (
  import('./components/ClassRoom/ClassroomDashboard.jsx')
));

const LazyLoadedDocuments = lazy(() => (
  import('./components/Documents/Documents.jsx')
));

const LazyLoadedTrash = lazy(() => (
  import('./components/Trash/Trash.jsx')
));

const LazyLoadedAccount = lazy(() => (
  import('./components/Account/Account.jsx')
));

const LazyLoadedProfilePreview = lazy(() => (
  import('./components/ProfilePreview/ProfilePreview.jsx')
));

const LazyLoadedClassView = lazy(() => (
  import('./components/ClassView/ClassView.jsx')
));

const LazyLoadedClassViewStudent = lazy(() => (
  import('./components/ClassViewStudent/ClassViewStudent.jsx')
));

const LazyLoadedAssignmentPage = lazy(() => (
  import('./components/AssignmentPage/AssignmentPage.jsx')
));

const LazyLoadedFullScreen = lazy(() => (
  import('./components/FullScreen/FullScreen')
));

const LazyLoadedPricing = lazy(() => (
  import('./components/Pricing/Pricing')
));

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={<LoadingMessage />}>
            <Switch>
              <Route exact path="/" component={withTracker(LazyLoadedApp)} />
              <Route path="/pebl/:id" component={withTracker(LazyLoadedApp)} />
              <Route path="/reset" component={withTracker(LazyLoadedApp)} />
              <Route path="/confirmation" component={withTracker(LazyLoadedApp)} />
              <Route path="/dashboard/:userName/folder/:folderShortId" component={withTracker(LazyLoadedDocuments)} />
              <Route path="/dashboard/" component={withTracker(LazyLoadedDocuments)} />
              <Route path="/payment/" component={withTracker(LazyLoadedPaymentPage)} />
              <Route path="/profile" component={withTracker(LazyLoadedProfilePreview)} exact />
              <Route
                path="/profile/:userName/folder/:folderShortId"
                component={withTracker(LazyLoadedPaymentProfile)}
              />
              <Route path="/profile/:userName" component={withTracker(LazyLoadedPaymentProfile)} />
              <Route path="/classroom" component={withTracker(LazyLoadedClassRoom)} exact />
              <Route
                path="/classroom/:classroomId/assignment/:assignmentId"
                component={withTracker(LazyLoadedAssignmentPage)}
              />
              <Route path="/classroom/teacher/:classId" component={withTracker(LazyLoadedClassView)} />
              <Route path="/classroom/student/:classId" component={withTracker(LazyLoadedClassViewStudent)} />
              <Route path="/documents/:userName/folder/:folderShortId" component={withTracker(LazyLoadedDocuments)} />
              <Route path="/documents" component={withTracker(LazyLoadedDocuments)} />
              <Route path="/trash" component={withTracker(LazyLoadedTrash)} />
              <Route path="/account" component={withTracker(LazyLoadedAccount)} />
              <Route path="/fullscreen/:id" component={withTracker(LazyLoadedFullScreen)} />
              <Route path="/pricing/:modal" component={withTracker(LazyLoadedPricing)} />
              <Route path="/pricing" component={withTracker(LazyLoadedPricing)} />
              <Route path="*" component={withTracker(LazyLoadedPage404)} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

if (window.location.pathname !== '/404') {
  store.dispatch(fetchCurrentUserForAppStartUp());
}
render(<Main />, document.getElementById('app'));
