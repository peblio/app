import React from 'react';
import PropTypes from 'prop-types';

import PricingCard from '../PricingCard/PricingCard';

const FreeCard = ({ active }) => (
  <PricingCard
    cardColor="#00151e"
    buttonText="Sign Up"
    planName="Free"
    planPricing="$0"
    planDetails="forever"
    onClick={() => {
      console.log('Sign Up');
    }}
    featureList={[
      'Unlimited public Pebls',
      '500MB Storage',
      '1 classroom (10 students)'
    ]}
    backdropColor="rgba(0, 21, 30, 0.1)"
    active={isPaidUser}
  />
);

FreeCard.propTypes = {
  isPaidUser: PropTypes.bool
};

FreeCard.defaultProps = {
  isPaidUser: false
};

export default FreeCard;
