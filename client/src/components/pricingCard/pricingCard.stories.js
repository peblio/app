import React from 'react';
import PricingCard from '../../app/components/PricingCard/PricingCard';

export default { title: 'Pricing Card' };

export const pricingCardFree = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
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
    />
  </div>
);

export const pricingCardTeacher = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <PricingCard
      cardColor="#980076"
      buttonText="Sign Up"
      planName="Teacher"
      planPricing="$12/mo"
      planDetails={(
        <div>
          <div className="">
            Billed at $144/year
            <br />
            (you’re saving $84 with an annual plan )
          </div>
          <div style={{
            marginTop: '12px',
            color: '#d8d8d8'
          }}
          >
            switch to monthly billing
          </div>
        </div>
      )}
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
    />
  </div>
);
