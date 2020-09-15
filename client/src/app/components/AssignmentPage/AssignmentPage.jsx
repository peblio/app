import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DatePickerField from '../DatePickerField/DatePickerField';
import DashboardView from '../DashboardBase/DashboardBase';
import Loader from '../GenericLoader/LoadingMessage';
import InputField from '../InputField/InputField';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';

import { fetchCurrentClassroomDetails, fetchCurrentAssignmentDetails } from '../../action/classroom';

import RightCrumbIcon from '../../images/right.svg';
import './assignmentPage.scss';

const AssignmentPage = (props) => {
  const [dueDate, setDueDate] = useState();

  useEffect(() => {
    props.fetchCurrentClassroomDetails(props.match.params.classroomId);
    props.fetchCurrentAssignmentDetails(props.match.params.assignmentId);
  }, []);

  useEffect(() => {
    if (props.currentAssignment.dueDate) {
      setDueDate(props.currentAssignment.dueDate);
    }
  }, [props.currentAssignment]);

  return (
    <DashboardView>
      {props.dataLoading ? <Loader />
        : (
          <main className="assignment-page">
            <div className="assignment-page__header-area">
              <div className="assignment-page__header-area__bread-crumbs">
                <span>{props.currentClassroom && props.currentClassroom.name}</span>
                <RightCrumbIcon />
                <span>{props.currentAssignment && props.currentAssignment.title}</span>
              </div>
              <div className="assignment-page__header-area__date-label">
                Due date
              </div>
              <DatePickerField
                containerWidth="171px"
                calendarPosition="right"
                state={dueDate}
                setState={setDueDate}
              />
            </div>
            <div className="assignment-page__action-area">
              <div className="assignment-page__action-area__dropdowns">
                <Dropdown
                  placeholder="A-Z"
                  style={{
                    width: '111px',
                    marginRight: '100px'
                  }}
                  options={[
                    {
                      name: 'A-Z',
                      value: 'A-Z',
                      onClick: () => { console.log('A-Z'); }
                    },
                    {
                      name: 'Z-A',
                      value: 'Z-A',
                      onClick: () => { console.log('Z-A'); }
                    }
                  ]}
                />
                <Dropdown
                  placeholder="100 pt"
                  style={{
                    width: '111px'
                  }}
                  options={[
                    {
                      name: 'A-Z',
                      value: 'A-Z',
                      onClick: () => { console.log('A-Z'); }
                    },
                    {
                      name: 'Z-A',
                      value: 'Z-A',
                      onClick: () => { console.log('Z-A'); }
                    }
                  ]}
                />
              </div>
              <Button className="primary">Publish grades</Button>
              <div className="assignment-page__action-area__turned-in">
                <span>18</span>
                {' '}
                turned in /
                {' '}
                <span>25</span>
                {' '}
                asigned
              </div>
            </div>
            <div className="assignment-page__container">
              <div className="assignment-page__container__students">
                {/* {
                  [...Array(50).keys()].map(() => (
                    <div className="assignment-page__container__students__student">
                      <div className="assignment-page__container__students__student__name">
                        John Doe
                      </div>
                      <div className="assignment-page__container__students__student__marks">
                        <InputField containerWidth="53px" style={{ marginRight: '8px' }} />
                        <span>
                          /100
                        </span>
                      </div>
                    </div>
                  ))
                } */}
                {
                  props.currentClassroom.members &&
                  props.currentClassroom.members.map(member => (
                    member.role !== 'teacher' && (
                      <div className="assignment-page__container__students__student">
                        <div className="assignment-page__container__students__student__name">
                          {member.userDetail.name}
                        </div>
                        <div className="assignment-page__container__students__student__marks">
                          <InputField containerWidth="53px" style={{ marginRight: '8px' }} />
                          <span>
                            /100
                          </span>
                        </div>
                      </div>
                    )
                  ))
                }
              </div>
              <div className="assignment-page__container__pebl">
                <div className="assignment-page__container__pebl__assignment">
                  <iframe
                    src={`/fullscreen/${'uPXlLzc1K'}`}
                    title="title"
                  />
                </div>
                <div className="assignment-page__container__pebl__comment">
                  <InputField placeholder="type comment..." />
                  <Button className="secondary">Send</Button>
                </div>
              </div>
            </div>
          </main>

        )
      }
    </DashboardView>
  );
};

AssignmentPage.propTypes = {
  currentClassroom: PropTypes.shape({
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({

    }))
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      assignmentId: PropTypes.string,
      classroomId: PropTypes.string
    })
  }).isRequired,
  fetchCurrentClassroomDetails: PropTypes.func.isRequired,
  fetchCurrentAssignmentDetails: PropTypes.func.isRequired,
  currentAssignment: PropTypes.shape({
    title: PropTypes.string,
    classroomId: PropTypes.string,
    dueDate: PropTypes.instanceOf(Date)
  }).isRequired,
  dataLoading: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCurrentClassroomDetails,
  fetchCurrentAssignmentDetails,
}, dispatch);

const mapStateProps = state => ({
  currentClassroom: state.classroom.currentClassroom,
  currentAssignment: state.classroom.currentAssignment,
  dataLoading: state.classroom.dataLoading,
});

export default connect(mapStateProps, mapDispatchToProps)(AssignmentPage);
