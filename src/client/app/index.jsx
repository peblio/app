import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App.jsx'

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route exact path="/potato" component={App} />
        </div>
      </Router>
    );
  }
}

render(<Main/>, document.getElementById('app'));
