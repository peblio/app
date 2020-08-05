import React from 'react';

import ClassesDashboard from '../../app/components/Mockups/ClassesDashboard/ClassesDashboard';
import JoinClassModal from '../../app/components/Mockups/JoinClassModal/JoinClassModal';
import CreateClassroomModal from '../../app/components/Mockups/CreateClassModal/CreateClassModal.jsx';
import CreateAssignmentModal from '../../app/components/Mockups/CreateAssignmentModal/CreateAssignmentModal.jsx';

export default { title: 'Mockups' };

export const createClassroomModal = () => (
  <CreateClassroomModal />
);

export const classesDashboard = () => (
  <ClassesDashboard />
);

export const joinClassModal = () => (
  <JoinClassModal />
);

export const createAssignmentModal = () => (
  <CreateAssignmentModal />
);
