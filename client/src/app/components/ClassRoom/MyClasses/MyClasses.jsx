import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import './MyClasses.scss';

import CreateClassModal from './CreateClassModal/CreateClassModal';
import JoinClassModal from './JoinClassModal/JoinClassModal';
import ClassTypeSection from './ClassTypeSection/ClassTypeSection';
import UpgradeView from './UpgradeView/UpgradeView';

import Dropdown from '../../Dropdown/Dropdown';
import GenericLoader from '../../GenericLoader/LoadingMessage';

import {
  toggleJoinClassroomModal,
  toggleCreateClassroomModal,
  fetchClassrooms,
  fetchClassroomCreateAccess,
  toggleLearnMoreModal,
} from '../../../action/classroom';

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
  userName,
  // eslint-disable-next-line no-shadow
  fetchClassroomCreateAccess,
  hasClassroomCreateAccess,
  // eslint-disable-next-line no-shadow
  toggleLearnMoreModal,
  learnMoreModal
}) => {
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    setDataLoading(true);
    fetchClassrooms()
      .then(() => fetchClassroomCreateAccess())
      .then(() => {
        setDataLoading(false);
      });
  },
  []);

  useEffect(() => {
    fetchClassrooms();
  },
  [userName]);

  return (
    <React.Fragment>
      {
        dataLoading ? <GenericLoader /> : (
          <main className="classroom" data-test="classroom-test">
            <div className="classroom__header-area">
              <header
                className="classroom__header-area__header"
                style={{
                  color: `${hasClassroomCreateAccess ? '#00151e' : '#979797'}`
                }}
              >
                My Classes
              </header>
              <Dropdown
                className="btn"
                placeholder="New class"
                style={{
                  width: '146px'
                }}
                options={hasClassroomCreateAccess
                  ? [
                    {
                      name: 'Create class',
                      value: 'create',
                      onClick: () => { toggleCreateClassroomModal(); }
                    }, {
                      name: 'Join class',
                      value: 'join',
                      onClick: () => { toggleJoinClassroomModal(); }
                    }
                  ]
                  : [
                    {
                      name: 'Join class',
                      value: 'join',
                      onClick: () => { toggleJoinClassroomModal(); }
                    }
                  ]
                }
              />
            </div>
            {
              hasClassroomCreateAccess ? (
                <React.Fragment>
                  <ClassTypeSection
                    header="Created classes"
                    classrooms={classrooms.filter(classroom => classroom.myMemberShipDetail.role === 'teacher')}
                    style={{
                      marginTop: '69px'
                    }}
                  />
                  <ClassTypeSection
                    header="Joined classes"
                    classrooms={classrooms.filter(classroom => classroom.myMemberShipDetail.role === 'student')}
                    style={{
                      marginTop: 0
                    }}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <UpgradeView learnMoreModal={learnMoreModal} toggleLearnMoreModal={toggleLearnMoreModal} />
                  <ClassTypeSection
                    header="Joined classes"
                    classrooms={classrooms.filter(classroom => classroom.myMemberShipDetail.role === 'student')}
                    style={{
                      marginTop: '69px'
                    }}
                  />
                </React.Fragment>
              )
            }
          </main>
        )
      }
      {createClassroomModal && (
        <CreateClassModal
          firstName={
            classrooms.length !== 0
              ? classrooms[0].myMemberShipDetail.firstName : ''}
          lastName={
            classrooms.length !== 0
              ? classrooms[0].myMemberShipDetail.lastName : ''}
        />
      )}
      {joinClassroomModal && (
        <JoinClassModal
          firstName={
            classrooms.length !== 0
              ? classrooms[0].myMemberShipDetail.firstName : ''}
          lastName={
            classrooms.length !== 0
              ? classrooms[0].myMemberShipDetail.lastName : ''}
        />
      )}
    </React.Fragment>
  );
};

MyClasses.propTypes = {
  classrooms: PropTypes.arrayOf(PropTypes.shape({
    myMemberShipDetail: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  })).isRequired,
  createClassroomModal: PropTypes.bool.isRequired,
  joinClassroomModal: PropTypes.bool.isRequired,
  toggleCreateClassroomModal: PropTypes.func.isRequired,
  toggleJoinClassroomModal: PropTypes.func.isRequired,
  fetchClassrooms: PropTypes.func.isRequired,
  fetchClassroomCreateAccess: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  hasClassroomCreateAccess: PropTypes.bool.isRequired,
  learnMoreModal: PropTypes.bool.isRequired,
  toggleLearnMoreModal: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    dataLoading: state.classroom.dataLoading,
    classrooms: state.classroom.classrooms,
    hasClassroomCreateAccess: state.classroom.hasClassroomCreateAccess,
    createClassroomModal: state.classroom.createClassroomModal,
    joinClassroomModal: state.classroom.joinClassroomModal,
    learnMoreModal: state.classroom.learnMoreModal,
    userName: state.user.name
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleJoinClassroomModal,
    toggleCreateClassroomModal,
    toggleLearnMoreModal,
    fetchClassrooms,
    fetchClassroomCreateAccess
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(MyClasses));
