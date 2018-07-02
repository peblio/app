function compareByUpdatedAt(a, b) {
  if (a.updatedAt < b.updatedAt) {
    return 1;
  } else if (a.updatedAt > b.updatedAt) {
    return -1;
  }
  return 0;
}

function compareByCreatedAt(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  } else if (a.updatedAt > b.updatedAt) {
    return -1;
  }
  return 0;
}

export default function compareTimestamps(a, b) {
  if (a.updatedAt && b.updatedAt) {
    return compareByUpdatedAt(a, b);
  } else if (a.createdAt && b.createdAt) {
    return compareByCreatedAt(a, b);
  } else if (a.updatedAt && !b.updatedAt) {
    return -1;
  } else if (!a.updatedAt && b.updatedAt) {
    return 1;
  } else if (a.createdAt && !b.createdAt) {
    return -1;
  } else if (!a.createdAt && b.createdAt) {
    return 1;
  }
  return 0;
}
