import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import './MyClasses.scss';

import CreateClassModal from './CreateClassModal/CreateClassModal';
import JoinClassModal from './JoinClassModal/JoinClassModal';

import Dropdown from '../../Dropdown/Dropdown';
import ClassCard from '../../ClassCard/ClassCard';
import IconButton from '../../IconButton/IconButton';

import googleClassroomIcon from '../../../images/googleClassroom.png';
import { toggleJoinClassroomModal, toggleCreateClassroomModal, fetchClassrooms } from '../../../action/classroom';

const MyClasses = ({
  classrooms,
  createClassroomModal,
  joinClassroomModal,
  // eslint-disable-next-line no-shadow
  toggleCreateClassroomModal,
  // eslint-disable-next-line no-shadow
  toggleJoinClassroomModal,
  // eslint-disable-next-line no-shadow
  fetchClassrooms
}) => {
  useEffect(() => {
    fetchClassrooms();
  },
  []);
  return (
    <React.Fragment>
      <main className="dashboard__main">
        <div className="dashboard__header-area">
          <header className="dashboard__header">
            My Classes
          </header>
          <IconButton
            style={{ marginRight: '58px' }}
            icon={<img src={googleClassroomIcon} alt="google classroom logo" />}
          >
            Sync with Google Classroom
          </IconButton>
          <Dropdown
            className="btn"
            placeholder="New class"
            style={{
              width: '146px'
            }}
            options={[
              {
                name: 'Create class',
                value: 'create',
                onClick: () => { toggleCreateClassroomModal(); }
              }, {
                name: 'Join class',
                value: 'join',
                onClick: () => { toggleJoinClassroomModal(); }
              }
            ]}
          />
        </div>
        <div className="dashboard__class-card-container">
          {
            classrooms.map(classroom => (
              <ClassCard
                key={classroom.id}
                classCode={classroom.id}
                classTitle={classroom.name}
                subject={classroom.subject}
                grade={classroom.grade}
                studentCount={classroom.members ? classroom.members.length : 0}
                tabIndex="0"
              />
            ))
          }
        </div>
      </main>
      {createClassroomModal && <CreateClassModal />}
      {joinClassroomModal && <JoinClassModal />}
    </React.Fragment>
  );
};

MyClasses.propTypes = {
  classrooms: PropTypes.arrayOf().isRequired,
  createClassroomModal: PropTypes.bool.isRequired,
  joinClassroomModal: PropTypes.bool.isRequired,
  toggleCreateClassroomModal: PropTypes.func.isRequired,
  toggleJoinClassroomModal: PropTypes.func.isRequired,
  fetchClassrooms: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    classrooms: state.classroom.classrooms,
    createClassroomModal: state.classroom.createClassroomModal,
    joinClassroomModal: state.classroom.joinClassroomModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleJoinClassroomModal,
    toggleCreateClassroomModal,
    fetchClassrooms
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(MyClasses));
