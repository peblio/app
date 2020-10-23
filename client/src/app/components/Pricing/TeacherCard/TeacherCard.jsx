import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PricingCard from '../PricingCard/PricingCard';

import './teacherCard.scss';

const TeacherCard = ({ active }) => {
  const [monthly, setMonthly] = useState(false);
  return (
    <PricingCard
      cardColor="#980076"
      buttonText="Upgrade"
      planName="Teacher"
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
      onClick={() => {
        console.log('Sign Up');
      }}
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

TeacherCard.propTypes = {
  active: PropTypes.bool
};

TeacherCard.defaultProps = {
  active: false
};

export default TeacherCard;
