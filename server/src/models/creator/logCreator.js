import Log from "../log";

export function buildLogFromRequest(request) {
  const log = new Log({
    name: request.body.name,
    user: request.body.user,
    message: request.body.message,
    info: request.body.info,
    stacktrace: request.body.stacktrace,
    path: request.body.path,
    action: request.body.action,
  });
  request.body.level ? (log.level = request.body.level) : null;
  request.body.module ? (log.module = request.body.module) : null;
  return log;
}

export function getQueryForSearchLogs(request) {
  const query = {};
  request.query.level ? query.level = request.query.level : null;
  request.query.module ? query.module = request.query.module : null;
  request.query.path ? query.path = request.query.path : null;
  request.query.action ? query.action = request.query.action : null;
  return query;
}

export function getOptionsForSearchLogs(request) {
  const options = {};
  request.query.limit ? options.limit = parseInt(request.query.limit) : options.limit = 10;
  request.query.offset ? options.offset = parseInt(request.query.offset) : options.offset = 0;
  return options;
}