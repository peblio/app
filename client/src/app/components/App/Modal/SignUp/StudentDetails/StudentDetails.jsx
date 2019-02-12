import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { setStudentBirthday, setGuardianEmail } from '../../../../../action/user.js';

import 'react-datepicker/dist/react-datepicker.css';

class StudentDetails extends React.Component {
  handleChange=(date) => {
    this.props.setStudentBirthday(date);
    const today = moment();
    console.log(date);
    const birthday = moment(date);
    const age = today.diff(birthday, 'years');
    if (age < 13) {
      this.props.setGuardianConsent(true);
    } else {
      this.props.setGuardianConsent(false);
    }
  }

  render() {
    return (
      <div>
        <DatePicker
          placeholderText="Select your birthday"
          selected={this.props.studentBirthday}
          onChange={this.handleChange}
          name="startDate"
          dateFormat="MM/DD/YYYY"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
        />
        {this.props.requiresGuardianConsent && (
          <div className="signup-modal__div">
            {/* eslint-disable */}
                      <p className="signup__notice">
                        {'Enter your parent\'s or guardian\'s email address and we will send them an email to confirm this account'}
                      </p>
                      {/* eslint-enable */}
            <input
              required
              className="signup-modal__input"
              id="signup-modal-guardian-mail"
              placeholder="Parent/Guardian email"
              ref={(guardianEmail) => { this.guardianEmail = guardianEmail; }}
              type="email"
              onChange={(e) => {
                this.props.setGuardianEmail(e.target.value);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

StudentDetails.propTypes = {
  requiresGuardianConsent: PropTypes.bool.isRequired,
  setGuardianConsent: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    // requiresGuardianConsent: state.user.requiresGuardianConsent,
    studentBirthday: state.user.studentBirthday
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setStudentBirthday,
  setGuardianEmail
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails);
