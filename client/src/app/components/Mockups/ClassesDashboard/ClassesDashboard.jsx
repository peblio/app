import React from 'react';
import SideBar from './SideBar/SideBar';
import Dropdown from '../../Dropdown/Dropdown';
import ClassCard from '../../ClassCard/ClassCard';
import ProgressBar from '../../ProgressBar/ProgressBar';

import TopNav from '../../TopNav/TopNav';

import './classesDashboard.scss';

const ClassesDashboard = () => (
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
        />
      </SideBar>
      <main className="dashboard__main">
        <div className="dashboard__header-area">
          <header className="dashboard__header">
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
                onClick: () => { console.log('Create'); }
              }, {
                name: 'Join class',
                value: 'join',
                onClick: () => { console.log('Join'); }
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
  </React.Fragment>
);

export default ClassesDashboard;
