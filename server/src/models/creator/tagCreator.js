import Tag from "../tag";

export function buildTagFromRequest(request) {
    return new Tag({ name: request.body.name });
  }