import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makePayment } from '../../action/profile';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit() {
    this.props.makePayment('contribute10', this.props.stripe);
    // this.props.makePayment('non-predefined-contribute', this.props.stripe, 35000);
  }

  render() {
    return (
      <div className="checkout-form__container">
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
  stripe: PropTypes.shape({}).isRequired,
  makePayment: PropTypes.func.isRequired,
};

export const PureCheckoutForm = CheckoutForm;

export default (connect(null, mapDispatchToProps)(injectStripe(CheckoutForm)));
