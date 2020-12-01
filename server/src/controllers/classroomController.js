import * as classroomService from '../service/classroomService';

export function createClassroomDetail(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.createClassroomDetail(req, res);
  }
}

export function getAllMyClassroomDetails(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getAllMyClassroomDetails(req, res);
  }
}

export function getClassroomDetail(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getClassroomDetail(req, res);
  }
}

export function joinClassroom(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.joinClassroom(req, res);
  }
}

export function addMemberToClassroom(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.addMemberToClassroom(req, res);
  }
}

export function getClassroomStudentAttemptForAssignment(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getClassroomStudentAttemptForAssignment(req, res);
  }
}

export function getClassroomAllAttemptsForAssignment(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getClassroomAllAttemptsForAssignment(req, res);
  }
}

export function getClassroomTopics(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getClassroomTopics(req, res);
  }
}

export function saveClassroomAssignmentStudentAttempt(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.saveClassroomAssignmentStudentAttempt(req, res);
  }
}

export function changeTurnInStatusOfClassroomAssignmentAttempt(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.changeTurnInStatusOfClassroomAssignmentAttempt(req, res);
  }
}

export function addCommentOnClassroomAssignmentAttempt(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.addCommentOnClassroomAssignmentAttempt(req, res);
  }
}

export function gradeClassroomAssignmentAttempt(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.gradeClassroomAssignmentAttempt(req, res);
  }
}

export function saveClassroomTopic(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.saveClassroomTopic(req, res);
  }
}

export function editClassroomTopicName(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.editClassroomTopicName(req, res);
  }
}

export function deleteClassroomTopic(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.deleteClassroomTopic(req, res);
  }
}

export function saveClassroomAssignment(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.saveClassroomAssignment(req, res);
  }
}

export function editClassroomAssignment(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.editClassroomAssignment(req, res);
  }
}

export function publishClassroomAssignment(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.publishClassroomAssignment(req, res);
  }
}

export function publishGradesForClassroomAssignment(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.publishGradesForClassroomAssignment(req, res);
  }
}

export function reassignTopicToAssignment(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.reassignTopicToAssignment(req, res);
  }
}

export function getClassroomAssignment(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getClassroomAssignment(req, res);
  }
}

export function getAllAssignmentsInClassroom(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getAllAssignmentsInClassroom(req, res);
  }
}

export function getAllAssignmentsInClassroomForStudent(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getAllAssignmentsInClassroomForStudent(req, res);
  }
}

export function getAllAssignmentsInClassroomByStudentForTeacher(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first' });
  } else {
    return classroomService.getAllAssignmentsInClassroomByStudentForTeacher(req, res);
  }
}
