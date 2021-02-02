import React from 'react';
import PropTypes from 'prop-types';

import PricingCard from '../PricingCard/PricingCard';

const FreeCard = ({ active, userName, openDowngradeModal, viewSignUpModal }) => (
  <PricingCard
    cardColor="#00151e"
    buttonText={
      // eslint-disable-next-line no-nested-ternary
      userName ? (!active ? 'Downgrade' : '') : 'Sign Up'
    }
    planName="Free"
    planPricing="$0"
    planDetails="forever"
    onClick={() => {
      if (userName && !active) {
        openDowngradeModal();
        return;
      }
      viewSignUpModal();
    }}
    featureList={[
      'Unlimited public Pebls',
      '500MB Storage',
      'Library of community resources'
    ]}
    backdropColor="rgba(0, 21, 30, 0.1)"
    active={active}
  />
);

FreeCard.propTypes = {
  active: PropTypes.bool,
  userName: PropTypes.string,
  openDowngradeModal: PropTypes.func.isRequired
};

FreeCard.defaultProps = {
  active: false,
  userName: ''
};

export default FreeCard;
