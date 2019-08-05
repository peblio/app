import axios from './axios';

export function saveLog(log) {
  axios.post('/logs', log)
    .then(res => console.log('Saved Log'))
    .catch(err => console.log(err));
}

export function saveErrorLog(error, getState, lastAction) {
  axios.post('/logs', {
    message: error && error.message ? error.message : null,
    stacktrace: error && error.stack ? error.stack : null,
    path: 'path',
    action: lastAction ? lastAction.type : 'DUMMY_ACTION',
    module: 'ui',
    level: 'ERROR',
    user: getState() && getState().user && getState().user.name ? getState().user.name : null
  })
    .then(res => console.log('Saved Error'))
    .catch(err => console.log('Error saving log'));
}
