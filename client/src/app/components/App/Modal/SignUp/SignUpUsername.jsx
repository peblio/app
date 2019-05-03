import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserName, setNextScreen } from '../../../../action/user.js';

class SignUpUsername extends React.Component {
  onNextButtonClick = () => {
    if (this.userName.value && this.userName.value !== '') {
      this.props.setUserName(this.userName.value);
      this.props.setNextScreen('SignupOption');
    }
  }

  render() {
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
  setNextScreen: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setUserName,
  setNextScreen
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpUsername);
