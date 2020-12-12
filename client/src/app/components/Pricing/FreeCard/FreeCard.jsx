import React from 'react';
import PropTypes from 'prop-types';

import PricingCard from '../PricingCard/PricingCard';

const FreeCard = ({ active, userId, openDowngradeModal, viewSignUpModal }) => (
  <PricingCard
    cardColor="#00151e"
    buttonText={
      // eslint-disable-next-line no-nested-ternary
      userId ? (!active ? 'Downgrade' : '') : 'Sign Up'
    }
    planName="Free"
    planPricing="$0"
    planDetails="forever"
    onClick={() => {
      if (userId && !active) {
        openDowngradeModal();
        return;
      }
      viewSignUpModal();
    }}
    featureList={[
      'Unlimited public Pebls',
      '500MB Storage',
      '1 classroom (10 students)'
    ]}
    backdropColor="rgba(0, 21, 30, 0.1)"
    active={active}
  />
);

FreeCard.propTypes = {
  active: PropTypes.bool,
  userId: PropTypes.string,
  openDowngradeModal: PropTypes.func.isRequired
};

FreeCard.defaultProps = {
  active: false,
  userId: ''
};

export default FreeCard;
