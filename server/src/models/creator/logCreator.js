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