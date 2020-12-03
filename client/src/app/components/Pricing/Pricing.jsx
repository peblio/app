import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopNav from '../TopNav/TopNav';
import FreeCard from './FreeCard/FreeCard';
import TeacherCard from './TeacherCard/TeacherCard';

import DesignElements from '../../images/pricing-design-elements.svg';


import {
  viewLoginModal,
  viewSignUpModal,
  closeLoginModal,
  closeSignUpModal,
} from '../../action/mainToolbar.js';

import './pricing.scss';

class Pricing extends React.Component {
  componentDidMount() {
    console.log(window.Stripe);
  }

  componentDidUpdate() {
    if (!this.props.user) {
      if (this.props.match.params.modal === 'login') {
        this.props.viewLoginModal();
      } else if (this.props.match.params.modal === 'signup') {
        this.props.viewSignUpModal();
      }
    } else if (this.props.match.params.modal === 'login') {
      this.props.closeLoginModal();
    } else if (this.props.match.params.modal === 'signup') {
      this.props.closeSignUpModal();
    }
  }

  redirectToStripeForPayment = () => {
    const stripe = window.Stripe('pk_test_9tSHnj3NTrLMsz2qOWYy4fn700dtmhzIa2');

    stripe.redirectToCheckout({
      lineItems: [{ price: 'price_1HuJdCFBQnwbqG0DgqEiKoeb', quantity: 1 }],
      mode: 'subscription',
      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfill-orders
      successUrl: 'https://peblio.co',
      cancelUrl: 'https://peblio.co',
    })
      .then((result) => {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          const displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      });
  }


  render() {
    return (
      <div>
        <TopNav />
        <div className="pricing-spacer" />
        <div className="pricing">
          <h1>Choose a Plan</h1>
          <div className="pricing__container">
            <DesignElements className="pricing__design-element" />
            <div className="pricing__container__cards-section">
              <FreeCard active />
              <TeacherCard stripePayment={this.redirectToStripeForPayment} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  viewLoginModal,
  viewSignUpModal,
  closeLoginModal,
  closeSignUpModal
}, dispatch);

Pricing.propTypes = {
  user: PropTypes.string.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      modal: PropTypes.string
    })
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
