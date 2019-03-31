// import createBrowserHistory from 'history/createBrowserHistory';
//
// const history = createBrowserHistory();
// export default history;
//

let history;

if (typeof document !== 'undefined') {
  const createBrowserHistory = require('history/createBrowserHistory').default;

  history = createBrowserHistory();
}

export default history;
