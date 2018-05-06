import React from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.jsx';
import App from './components/App.jsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

require('./styles/sass/main.scss');

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/pebl" component={App} />
            <Route path="/reset" component={App} />
            <Route exact path="/pebls" component={App} />
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<Main />, document.getElementById('app'));
