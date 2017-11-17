import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../action/user.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>LOG IN!</h1>
        <form onSubmit={(event) => {this.props.loginUser(event,this.props.name, this.props.password)}}>
          <label> name:
            <input type="text" value={this.props.name} onChange={this.props.updateUserName}/>
          </label>
          <label> password:
            <input type="text" value={this.props.password} onChange={this.props.updateUserPassword}/>
          </label>
          <input type="submit" value='Submit'/>
        </form>
      </div>
    );
  }

}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    password: state.user.password
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    userActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(Login));
