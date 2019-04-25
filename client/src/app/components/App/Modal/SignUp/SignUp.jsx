import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentBirthDateDetails from './StudentDetails/StudentBirthDateDetails.jsx';
import SignUpOption from './SignUpOption.jsx';
import { setUserName, setUserType, setNextScreen } from '../../../../action/user.js';
import SignUpUsername from './SignUpUsername.jsx';
import PeblioSignUpForm from './PeblioSignUpForm.jsx';

require('./signup.scss');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserTypeSelected: false,
      isFormVisible: true
    };
  }

  componentWillUnmount() {
    this.props.authLoadedPage();
  }

  userTypeSelected = () => {
    this.setState({
      isUserTypeSelected: true
    });
  }

  onNextButtonClick = () => {
    if (this.state.isUserTypeSelected && this.state.termsAgreed) {
      if (this.props.userType === 'student') {
        this.props.setNextScreen('StudentBirthdayScreen');
      } else {
        this.props.setNextScreen('SignupUsernameScreen');
      }
    }
  }

  setTermsAgreed = () => {
    this.setState({
      termsAgreed: this.termsAgreed.checked
    });
  }

  renderStudentBirthDateComponent() {
    return (
      <div className="signup-modal__content">
        <StudentBirthDateDetails />
      </div>
    );
  }

  renderSignupUsernameComponent() {
    return (
      <div className="signup-modal__content">
        <SignUpUsername />
      </div>
    );
  }

  renderSignupOption() {
    return (
      <div className="signup-modal__content">
        <SignUpOption />
      </div>
    );
  }

  renderPeblioSignUpForm() {
    return (
      <div className="signup-modal__content">
        <PeblioSignUpForm />
      </div>
    );
  }

  renderSignupTypes() {
    return (
      <div>
        <h1 className="signup-modal__title">Sign Up</h1>
        <div className="signup-modal__radio-holder">
          <h2 className="signup-modal__subtitle"> I am signing up as a...</h2>
          <ul className="signup-modal__list">
            <li className="signup-modal__listitem">
              <label
                className="signup-modal__label"
                htmlFor="student"
              >
                <input
                  required
                  type="radio"
                  className="signup-modal__radio"
                  data-test="signup-modal__radio-student"
                  name="type"
                  value="student"
                  id="student"
                  onChange={(e) => {
                    this.props.setUserType(e.target.value);
                    this.userTypeSelected();
                  }}
                />
            Student
              </label>
            </li>
            <li className="signup-modal__listitem">
              <label
                className="signup-modal__label"
                htmlFor="teacher"
              >
                <input
                  type="radio"
                  className="signup-modal__radio"
                  data-test="signup-modal__radio-teacher"
                  name="type"
                  value="teacher"
                  onChange={(e) => {
                    this.props.setUserType(e.target.value);
                    this.userTypeSelected();
                  }}
                />
            Teacher
              </label>
            </li>
            <li className="signup-modal__listitem">
              <label
                className="signup-modal__label"
                htmlFor="other"
              >
                <input
                  type="radio"
                  className="signup-modal__radio"
                  name="type"
                  value="other"
                  onChange={(e) => {
                    this.props.setUserType(e.target.value);
                    this.userTypeSelected();
                  }}
                />
            Other
              </label>
            </li>
          </ul>
        </div>
        <input
          required
          type="checkbox"
          className="signup-modal__checkbox"
          data-test="signup-modal__checkbox"
          name="checkbox"
          ref={(termsAgreed) => { this.termsAgreed = termsAgreed; }}
          onChange={this.setTermsAgreed}
          id="agree"
        />
        <label
          className="signup-modal__terms-label"
          htmlFor="agree"
        >
          {' '}
          I have read and agree to the
          {' '}
          <a
            href="https://www.peblio.co/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
            className="signup-modal__link"
          >
            Terms of Use
          </a>
          {' '}
          and
          {' '}
          <a
            href="https://www.peblio.co/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="signup-modal__link"
          >
          Privacy Policy
          </a>
        </label>
        <div className="signup-modal__buttonholder">
          <button
            className="signup-modal__button"
            data-test="signup-modal__button-next"
            value="Submit"
            onClick={this.onNextButtonClick}
          >
          Next
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.nextScreen) {
      switch (this.props.nextScreen) {
        case 'StudentBirthdayScreen':
          return this.renderStudentBirthDateComponent();
        case 'SignupUsernameScreen':
          return this.renderSignupUsernameComponent();
        case 'SignupOption':
          return this.renderSignupOption();
        case 'PeblioSignUpForm':
          return this.renderPeblioSignUpForm();
        default:
          return this.renderSignupTypes();
      }
    }
    return (
      <div className="signup-modal__content">
        {this.state.isFormVisible && this.renderSignupTypes() }
      </div>
    );
  }
}

SignUp.propTypes = {
  authLoadedPage: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
  setNextScreen: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  nextScreen: PropTypes.string.isRequired
};


function mapStateToProps(state) {
  return {
    requiresGuardianConsent: state.user.requiresGuardianConsent,
    userType: state.user.type,
    studentBirthday: state.user.studentBirthday,
    nextScreen: state.user.nextScreen
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setUserName,
  setUserType,
  setNextScreen
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
