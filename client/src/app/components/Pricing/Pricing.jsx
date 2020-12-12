import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DowngradeModal from './DowngradeModal/DowngradeModal';

import TopNav from '../TopNav/TopNav';
import FreeCard from './FreeCard/FreeCard';
import PaidCard from './PaidCard/PaidCard';

import DesignElements from '../../images/pricing-design-elements.svg';

import {
  viewLoginModal,
  viewSignUpModal,
  closeLoginModal,
  closeSignUpModal,
} from '../../action/mainToolbar.js';

import {
  fetchClassroomCreateAccess,
} from '../../action/classroom.js';

import './pricing.scss';

class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downgradeModal: false
    };
  }

  componentDidMount() {
    this.props.fetchClassroomCreateAccess();
    if (this.props.match.params.modal === 'login') {
      this.props.viewLoginModal();
    } else if (this.props.match.params.modal === 'signup') {
      this.props.viewSignUpModal();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.userId) {
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

    console.log(prevProps);
  }

  handleCloseDowngradeModal = () => {
    this.setState(() => ({
      downgradeModal: false
    }));
  }

  handleOpenDowngradeModal = () => {
    this.setState(() => ({
      downgradeModal: true
    }));
  }

  redirectToStripeForPaymentMonthly = () => {
    const stripe = window.Stripe('pk_test_9tSHnj3NTrLMsz2qOWYy4fn700dtmhzIa2');

    stripe.redirectToCheckout({
      lineItems: [{ price: 'price_1HuOAqFBQnwbqG0D0R7DqiOD', quantity: 1 }],
      mode: 'subscription',
      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfill-orders
      successUrl: `${process.env.UI_DOMAIN}/classroom`,
      cancelUrl: `${process.env.UI_DOMAIN}/pricing`,
      customerEmail: this.props.userEmail
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

  redirectToStripeForPaymentAnnually = () => {
    const stripe = window.Stripe('pk_test_9tSHnj3NTrLMsz2qOWYy4fn700dtmhzIa2');

    stripe.redirectToCheckout({
      lineItems: [{ price: 'price_1HuOAqFBQnwbqG0DgWkIX2mv', quantity: 1 }],
      mode: 'subscription',
      successUrl: `${process.env.UI_DOMAIN}/classroom`,
      cancelUrl: `${process.env.UI_DOMAIN}/pricing`,
      customerEmail: this.props.userEmail
    })
      .then((result) => {
        if (result.error) {
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
              <FreeCard
                active={!this.props.isPaidUser}
                userId={this.props.userId}
                openDowngradeModal={this.handleOpenDowngradeModal}
                viewSignUpModal={this.props.viewSignUpModal}
              />
              <PaidCard
                active={this.props.isPaidUser}
                userId={this.props.userId}
                stripePaymentMonthly={this.redirectToStripeForPaymentMonthly}
                stripePaymentAnnually={this.redirectToStripeForPaymentAnnually}
                viewSignUpModal={this.props.viewSignUpModal}
              />
            </div>
          </div>
        </div>
        {this.state.downgradeModal && <DowngradeModal closeDowngradeModal={this.handleCloseDowngradeModal} />}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  userId: state.user.id,
  userEmail: state.user.email,
  isPaidUser: state.classroom.hasClassroomCreateAccess,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  viewLoginModal,
  viewSignUpModal,
  closeLoginModal,
  closeSignUpModal,
  fetchClassroomCreateAccess,
}, dispatch);

Pricing.propTypes = {
  userId: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  fetchClassroomCreateAccess: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      modal: PropTypes.string
    })
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
