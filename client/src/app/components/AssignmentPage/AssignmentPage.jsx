import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DatePickerField from '../DatePickerField/DatePickerField';
import DashboardView from '../DashboardBase/DashboardBase';
import Loader from '../GenericLoader/LoadingMessage';
import InputField from '../InputField/InputField';
import RightCrumbIcon from '../../images/right.svg';

import { fetchCurrentClassroomDetails, fetchCurrentAssignmentDetails } from '../../action/classroom';

import './assignmentPage.scss';

const AssignmentPage = (props) => {
  const [dueDate, setDueDate] = useState(Date.now());

  useEffect(() => {
    props.fetchCurrentAssignmentDetails(props.match.params.assignmentId);
  }, []);

  useEffect(() => {
    if (props.currentAssignment) {
      props.fetchCurrentClassroomDetails(props.currentAssignment.classroomId);
      setDueDate(props.currentAssignment.dueDate);
    }
  }, [props.currentAssignment.classroomId]);

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
              />
            </div>
            <div className="assignment-page__container">
              <div className="assignment-page__container__students">
                {
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
                }
              </div>
              <div className="assignment-page__container__pebl">

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
    name: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      assignmentId: PropTypes.string
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
