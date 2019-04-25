import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpOption from './SignUpOption.jsx';
import { setUserName } from '../../../../action/user.js';


class SignUpUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCreateUserNameScreen: false
    };
  }

  onNextButtonClick = () => {
    if (this.userName.value && this.userName.value !== '') {
      this.props.setUserName(this.userName.value);
      this.setState({ renderCreateUserNameScreen: true });
    }
  }

  render() {
    if (this.state.renderCreateUserNameScreen) {
      return (<SignUpOption />);
    }
    return (
      <div>
        <div className="signup-modal__div">
          <input
            required
            className="signup-modal__input"
            data-test="signup-modal__input-name"
            id="signup-modal-name"
            placeholder="username"
            ref={(userName) => { this.userName = userName; }}
            type="text"
          />
        </div>
        <div className="signup-modal__buttonholder">
          <button
            className="signup-modal__button"
            data-test="signup-modal__button-next"
            onClick={this.onNextButtonClick}
            value="Submit"
          >
                Next
          </button>
        </div>
      </div>
    );
  }
}

SignUpUsername.propTypes = {
  setUserName: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setUserName
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpUsername);
