function compareByUpdatedAt(a, b) {
  if (a.updatedAt < b.updatedAt) {
    return 1;
  }
  if (a.updatedAt > b.updatedAt) {
    return -1;
  }

  return 0;
}

function compareByCreatedAt(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  if (a.updatedAt > b.updatedAt) {
    return -1;
  }

  return 0;
}

export default function compareTimestamps(a, b) {
  if (a.updatedAt && b.updatedAt) {
    return compareByUpdatedAt(a, b);
  }
  if (a.createdAt && b.createdAt) {
    return compareByCreatedAt(a, b);
  }
  if (a.updatedAt && !b.updatedAt) {
    return -1;
  }
  if (!a.updatedAt && b.updatedAt) {
    return 1;
  }
  if (a.createdAt && !b.createdAt) {
    return -1;
  }
  if (!a.createdAt && b.createdAt) {
    return 1;
  }

  return 0;
}
