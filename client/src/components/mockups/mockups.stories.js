import React from 'react';

import ClassesDashboard from '../../app/components/Mockups/ClassesDashboard/ClassesDashboard';
import ClassView from '../../app/components/Mockups/ClassView/ClassView';
import JoinClassModal from '../../app/components/Mockups/JoinClassModal/JoinClassModal';
import CreateClassroomModal from '../../app/components/Mockups/CreateClassModal/CreateClassModal.jsx';
import CreateAssignmentModal from '../../app/components/Mockups/CreateAssignmentModal/CreateAssignmentModal.jsx';
import CreateTopicModal from '../../app/components/Mockups/CreateTopicModal/CreateTopicModal.jsx';
import EditTopicModal from '../../app/components/Mockups/EditTopicModal/EditTopicModal.jsx';

export default { title: 'Mockups' };

export const createClassroomModal = () => (
  <CreateClassroomModal />
);

export const classesDashboard = () => (
  <ClassesDashboard />
);

export const classView = () => (
  <ClassView />
);

export const createTopicModal = () => (
  <CreateTopicModal />
);

export const editTopicModal = () => (
  <EditTopicModal currentTitle="Title" />
);

export const joinClassModal = () => (
  <JoinClassModal />
);

export const createAssignmentModal = () => (
  <CreateAssignmentModal />
);
