import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import axios from '../../../utils/axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    const tokenResponse = await this.props.stripe.createToken({ name: 'Name' });
    console.log('Token', tokenResponse);
    const data = {
      email: 'komalahluwalia06@gmail.com',
      id: tokenResponse.token.id
    };
    axios.post('/charge', data)
      .then((response) => {
        console.log('Purchase Complete!');
        console.log(response);
      });
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  stripe: PropTypes.func.isRequired,
};

export default injectStripe(CheckoutForm);
