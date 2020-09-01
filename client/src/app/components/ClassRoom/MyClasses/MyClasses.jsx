import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import history from '../../../utils/history';

import './MyClasses.scss';

import CreateClassModal from './CreateClassModal/CreateClassModal';
import JoinClassModal from './JoinClassModal/JoinClassModal';

import Dropdown from '../../Dropdown/Dropdown';
import ClassCard from '../../ClassCard/ClassCard';
import GenericLoader from '../../GenericLoader/LoadingMessage';

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
  fetchClassrooms,
  dataLoading,
  userName
}) => {
  useEffect(() => {
    fetchClassrooms();
  },
  []);

  useEffect(() => {
    fetchClassrooms();
  },
  [userName]);

  return (
    <React.Fragment>
      <main className="classroom">
        <div className="classroom__header-area">
          <header className="classroom__header-area__header">
            My Classes
          </header>
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
        {dataLoading ? <GenericLoader /> : (
          <div className="classroom__class-card-container">
            {
              classrooms.map(classroom => (
                <ClassCard
                  onClick={() => { history.push(`/classroom/${classroom.id}`); }}
                  key={classroom.id}
                  classCode={classroom.id}
                  classTitle={classroom.name}
                  subject={classroom.subject}
                  grade={classroom.grade}
                  studentCount={classroom.members ? classroom.members.length : 0}
                />
              ))
            }
          </div>
        )}
      </main>
      {createClassroomModal && <CreateClassModal />}
      {joinClassroomModal && <JoinClassModal />}
    </React.Fragment>
  );
};

MyClasses.propTypes = {
  classrooms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  createClassroomModal: PropTypes.bool.isRequired,
  joinClassroomModal: PropTypes.bool.isRequired,
  toggleCreateClassroomModal: PropTypes.func.isRequired,
  toggleJoinClassroomModal: PropTypes.func.isRequired,
  fetchClassrooms: PropTypes.func.isRequired,
  dataLoading: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
};


function mapStateToProps(state) {
  return {
    dataLoading: state.classroom.dataLoading,
    classrooms: state.classroom.classrooms,
    createClassroomModal: state.classroom.createClassroomModal,
    joinClassroomModal: state.classroom.joinClassroomModal,
    userName: state.user.name
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
