import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { fetchProfile } from '../../action/profile';
import { fetchCurrentUser } from '../../action/user';

class PaymentPage extends React.Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }

  componentDidMount() {
    this.props.fetchCurrentUser()
      .then(() => {
        this.props.fetchProfile(this.props.userName);
      });
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY) });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY) });
      });
    }
  }

  render() {
    return (
      <div className="payment-page__container">
        { this.state.stripe && (
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        )}
      </div>
    );
  }
}

PaymentPage.propTypes = {
  userName: PropTypes.string.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    userName: state.user.name,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProfile,
    fetchCurrentUser
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(PaymentPage));
