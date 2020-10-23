import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopNav from '../TopNav/TopNav';
import PricingCard from './PricingCard/PricingCard';

import DesignElements from '../../images/pricing-design-elements.svg';


import {
  viewLoginModal,
  viewSignUpModal,
  closeLoginModal,
  closeSignUpModal,
} from '../../action/mainToolbar.js';

import './pricing.scss';

const Pricing = (props) => {
  const initRender = useRef(true);

  useEffect(() => {
    if (!props.user) {
      if (props.match.params.modal === 'login') {
        props.viewLoginModal();
      } else if (props.match.params.modal === 'signup') {
        props.viewSignUpModal();
      }
    } else if (props.match.params.modal === 'login') {
      props.closeLoginModal();
    } else if (props.match.params.modal === 'signup') {
      props.closeSignUpModal();
    }
  }, [props.user]);

  return (
    <div>
      <TopNav />
      <div className="pricing-spacer" />
      <div className="pricing">
        <h1>Choose a Plan</h1>
        <div className="pricing__container">
          <DesignElements className="pricing__design-element" />
          <div className="pricing__container__cards-section">
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
              active
            />
            <PricingCard
              cardColor="#980076"
              buttonText="Upgrade"
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
                    marginTop: '8px',
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  viewLoginModal,
  viewSignUpModal,
  closeLoginModal,
  closeSignUpModal
}, dispatch);

Pricing.propTypes = {
  user: PropTypes.string.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
