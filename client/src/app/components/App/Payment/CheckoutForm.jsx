import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makePayment } from '../../../action/profile';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit() {
    this.props.makePayment('pro', this.props.stripe);
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    makePayment
  }, dispatch);
}

CheckoutForm.propTypes = {
  stripe: PropTypes.object.isRequired,
  makePayment: PropTypes.func.isRequired,
};


export default (connect(null, mapDispatchToProps)(injectStripe(CheckoutForm)));
