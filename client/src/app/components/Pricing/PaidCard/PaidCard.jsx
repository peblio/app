import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PricingCard from '../PricingCard/PricingCard';

import './paidCard.scss';

const PaidCard = ({ active, stripePaymentMonthly, stripePaymentAnnual }) => {
  const [monthly, setMonthly] = useState(false);
  console.log('monthly:', monthly);
  return (

    <PricingCard
      cardColor="#980076"
      buttonText="Upgrade"
      planName={monthly ? 'Teacher Annual' : 'Teacher Monthly'}
      planPricing={monthly ? '$12/mo' : '$19/mo'}
      planDetails={
        monthly ? (
          <div>
            <div className="">
              Billed at $144/year
              <br />
              (you’re saving $84 with an annual plan )
            </div>
            <button
              className="pricing-plan-switch"
              onClick={() => { setMonthly(val => !val); }}
            >
              switch to monthly billing
            </button>
          </div>
        ) : (
          <div>
            <div className="">
              Go annual instead and
              <br />
              save $84 a year
            </div>
            <button
              className="pricing-plan-switch"
              onClick={() => { setMonthly(val => !val); }}
            >
              switch to annual billing
            </button>
          </div>
        )
      }
      onClick={monthly ? stripePaymentMonthly : stripePaymentAnnual}
      featureList={[
        'Everything in Free',
        'Unlimited students',
        'Unlimited classrooms',
        'Asset hosting with 5GB storage',
      ]}
      backdropColor="rgba(152, 0, 118, 0.2)"
      active={active}
    />
  );
};

PaidCard.propTypes = {
  active: PropTypes.bool,
  stripePaymentMonthly: PropTypes.func.isRequired,
  stripePaymentAnnual: PropTypes.func.isRequired,
};

PaidCard.defaultProps = {
  active: false
};

export default PaidCard;
