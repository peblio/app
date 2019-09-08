import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import './dashboard.scss';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckoutForm from '../App/Payment/CheckoutForm';
import { fetchProfile } from '../../action/profile';

class PaymentPage extends React.Component {
  componentWillMount() {
    this.props.fetchProfile(this.props.userName);
  }

  render() {
    console.log('rendered');
    return (
      <StripeProvider apiKey="pk_test_9tSHnj3NTrLMsz2qOWYy4fn700dtmhzIa2">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
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
