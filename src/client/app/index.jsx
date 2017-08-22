import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/editorContainer.jsx';

import App from './components/App.jsx';

let store = createStore(rootReducer);

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
