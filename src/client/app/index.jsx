import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/editorContainer.jsx';
import thunk from 'redux-thunk';

import App from './components/App.jsx';
import Test from './components/Test.jsx';

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
        <App/>
      </Provider>
    );
  }
}

render(<Main/>, document.getElementById('app'));
