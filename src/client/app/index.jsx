import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.js';
import App from './components/App.jsx';
import withTracker from './withTracker.jsx';

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
        <BrowserRouter>
          <div>
            <Route exact path="/" component={withTracker(App)} />
            <Route path="/pebl" component={withTracker(App)} />
            <Route path="/reset" component={withTracker(App)} />
            <Route path="/confirmation" component={withTracker(App)} />
            <Route exact path="/pebls" component={App} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

render(<Main />, document.getElementById('app'));
