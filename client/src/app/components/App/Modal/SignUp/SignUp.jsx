import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../../../../utils/axios';
import StudentBirthDateDetails from './StudentDetails/StudentBirthDateDetails.jsx';
import SignUpOption from './SignUpOption.jsx';
import { setUserName, setUserType, setNextScreen } from '../../../../action/user.js';
import CheckSVG from '../../../../images/green-check.svg';
import SignUpUsername from './SignUpUsername.jsx';
import PeblioSignUpForm from './PeblioSignUpForm.jsx';

require('./signup.scss');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserTypeSelected: false,
      tempUsername: ''
    };
  }

  componentWillMount() {
    this.props.setNextScreen('');
  }

  componentWillUnmount() {
    this.props.authLoadedPage();
  }

  userTypeSelected = () => {
    this.setState({
      isUserTypeSelected: true
    });
  }

  setTempUserName = (name) => {
    this.setState({
      tempUsername: name
    });
  }

  renderSignupScreenNumber(activeScreen) {
    const numbers = [];
    for (let i = 1; i <= 3; i += 1) {
      numbers.push(
        <div className="signup-modal__screen-no-container">
          <li className={`signup-modal__screen-no-item${(i <= activeScreen) ? '--selected' : ''}`}>
            {i}
          </li>
          <hr className={`signup-modal__screen-line${(i === 3) ? '--hide' : ''}`} />
        </div>
      );
    }
    return (
      <ul className="signup-modal__screen-no">
        {numbers}
      </ul>
    );
  }

  renderStudentBirthDateComponent() {
    return (
      <div className="signup-modal__content">
        {this.props.userType === 'student' && this.renderSignupScreenNumber(1)}
        <StudentBirthDateDetails />
      </div>
    );
  }

  renderSignupUsernameComponent() {
    return (
      <div className="signup-modal__content">
        {this.props.userType === 'student' && this.renderSignupScreenNumber(2)}
        <SignUpUsername
          setTempUserName={this.setTempUserName}
          tempUsername={this.state.tempUsername}
        />
      </div>
    );
  }

  renderSignupOption() {
    return (
      <div className="signup-modal__content">
        {this.props.userType === 'student' && this.renderSignupScreenNumber(3)}
        <SignUpOption
          tempUsername={this.state.tempUsername}
        />
      </div>
    );
  }

  renderPeblioSignUpForm() {
    return (
      <div className="signup-modal__content">
        {this.props.userType === 'student' && this.renderSignupScreenNumber(3)}
        <PeblioSignUpForm
          tempUsername={this.state.tempUsername}
        />
      </div>
    );
  }

  renderSignupType(labelText, htmlFor) {
    const isCurrentUserType = this.props.userType === htmlFor;

    return (
      <li className={`signup-modal__listitem ${(isCurrentUserType) ? 'signup-modal__listitem--selected' : ''}`}>
        <label
          className="signup-modal__label"
          htmlFor={htmlFor}
          data-test={`signup-modal__radio-${htmlFor}`}
        >
          <input
            required
            type="radio"
            className="signup-modal__radio"
            name="type"
            value={htmlFor}
            id={htmlFor}
            onChange={(e) => {
              this.props.setUserType(e.target.value);
              this.userTypeSelected();
            }}
          />
          {labelText}
          <CheckSVG
            className={`signup-modal__check${(isCurrentUserType) ? '--selected' : ''}`}
            alt="check svg"
          />
        </label>
      </li>
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
          return this.renderSignupUsernameComponent();
      }
    }
    return (
      <div>
        {this.renderSignupUsernameComponent() }
      </div>
    );
  }
}

SignUp.propTypes = {
  authLoadedPage: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
  setNextScreen: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  nextScreen: PropTypes.string
};

SignUp.defaultProps = {
  nextScreen: null
};

function mapStateToProps(state) {
  return {
    userType: state.user.type,
    nextScreen: state.user.nextScreen
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setUserName,
  setUserType,
  setNextScreen
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
