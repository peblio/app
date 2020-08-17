import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SideBar from './SideBar/SideBar';
import CreateClassModal from './CreateClassModal/CreateClassModal';
import JoinClassModal from './JoinClassModal/JoinClassModal';

import Dropdown from '../Dropdown/Dropdown';
import ClassCard from '../ClassCard/ClassCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import IconButton from '../IconButton/IconButton';

import googleClassroomIcon from '../../images/googleClassroom.png';

import * as userActions from '../../action/user';

import {
  deleteFolder,
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders,
  renameFolder,
  renamePage
} from '../../action/page';

import {
  setShareURL,
  viewShareModal,
  closeShareModal
} from '../../action/mainToolbar';

import TopNav from '../TopNav/TopNav';

import './classesDashboard.scss';

const ClassesDashboard = (props) => {
  useEffect(() => {
    props.fetchCurrentUser()
      .then(() => {
        props.fetchUserProfile(props.name);
      });
  },
  []);

  const [createClassModal, setCreateClassModal] = useState(false);
  const [joinClassModal, setJoinClassModal] = useState(false);

  return (
    <React.Fragment>
      <TopNav />
      <div className="dashboard">
        <SideBar>
          <ProgressBar
            style={{
              padding: '25px',
              borderTop: '1px solid #CCD0D2'
            }}
            label="STORAGE"
            total={20}
            completed={10}
            units="GB"
            containerWidth="100%"
          />
        </SideBar>
        <main className="dashboard__main">
          <div className="dashboard__header-area">
            <header className="dashboard__header">
              My Classes
            </header>
            <IconButton
              style={{ marginRight: '58px' }}
              icon={<img src={googleClassroomIcon} />}
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
                  onClick: () => { setCreateClassModal(() => true); }
                }, {
                  name: 'Join class',
                  value: 'join',
                  onClick: () => { setJoinClassModal(() => true); }
                }
              ]}
            />
          </div>
          <div className="dashboard__class-card-container">
            <ClassCard
              classCode="Qo0234p"
              classTitle="Class For My Kiddos"
              subject="Computer Science"
              grade="6th"
              studentCount={30}
              tabIndex="0"
            />
            <ClassCard
              classCode="RoQwe12"
              classTitle="Class 12345"
              subject="Computer Science"
              grade="6th"
              studentCount={30}
              tabIndex="0"
            />
          </div>
        </main>
      </div>
      {createClassModal && <CreateClassModal modalClose={() => { setCreateClassModal(() => false); }} />}
      {joinClassModal && <JoinClassModal modalClose={() => { setJoinClassModal(() => false); }} />}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    image: state.user.image,
    isShareModalOpen: state.mainToolbar.isShareModalOpen,
    name: state.user.name,
    blurb: state.user.blurb,
    dashboardView: state.dashboard.dashboardView,
    folders: state.page.folders,
    pages: state.page.pages,
    selectedFolderIds: state.page.selectedFolderIds,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSelectedFolders,
    deleteFolder,
    fetchAllPages,
    jumpToFolderByShortId,
    setShareURL,
    viewShareModal,
    closeShareModal,
    renameFolder,
    renamePage,
    ...userActions
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(ClassesDashboard));
