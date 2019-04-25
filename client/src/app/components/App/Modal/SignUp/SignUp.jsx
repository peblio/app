import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentBirthDateDetails from './StudentDetails/StudentBirthDateDetails.jsx';
import { setUserName, setUserType } from '../../../../action/user.js';
import SignUpUsername from './SignUpUsername.jsx';

require('./signup.scss');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserTypeSelected: false,
      isFormVisible: true,
      renderNextScreen: false
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
      this.setState({
        renderNextScreen: true
      });
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

  render() {
    if (this.state.renderNextScreen) {
      if (this.props.userType === 'student') {
        return this.renderStudentBirthDateComponent();
      }
      return this.renderSignupUsernameComponent();
    }
    return (
      <div className="signup-modal__content">
        {this.state.isFormVisible && (
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
        )}
      </div>
    );
  }
}

SignUp.propTypes = {
  authLoadedPage: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
  return {
    requiresGuardianConsent: state.user.requiresGuardianConsent,
    userType: state.user.type,
    studentBirthday: state.user.studentBirthday,
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setUserName,
  setUserType
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
