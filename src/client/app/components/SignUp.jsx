import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../action/user.jsx';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  submitSignUpUser(event,name,password) {
    axios.post('/users/signup', {
        name: name,
        password: password
      })
        .then(function(response) { // eslint-disable-line
          console.log(response);
        })
        .catch(function(error) { // eslint-disable-line
          console.log(error);
        });
      event.preventDefault();
  }

  render() {
    return (
      <div>
        Sign up here
        <form onSubmit={(event) => {this.props.signUserUp(event, this.props.name, this.props.password)}}>
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

export default SignUp;
