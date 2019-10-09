import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { fetchProfile } from '../../action/profile';

class PaymentPage extends React.Component {
  componentWillMount() {
    this.props.fetchProfile(this.props.userName);
  }

  render() {
    console.log('rendered', process.env.STRIPE_PUBLISHABLE_KEY);
    return (
      <div className="payment-page__container">
        <StripeProvider apiKey={process.env.STRIPE_PUBLISHABLE_KEY}>
          <div className="example">
            <h1>React Stripe Elements Example</h1>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

PaymentPage.propTypes = {
  userName: PropTypes.string.isRequired,
  fetchProfile: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    userName: state.user.name,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProfile
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(PaymentPage));
