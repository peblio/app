import React from 'react';
import PropTypes from 'prop-types';

import './pricingCard.scss';

const PricingCard = props => (
  <div className={`pricing-card ${props.active ? 'pricing-card--active' : ''}`}>
    {
      props.active && (
        <div className="pricing-card__active-text">
          YOUR CURRENT PLAN
        </div>
      )
    }
    <div className="pricing-card__backdrop" style={{ background: props.backdropColor }} />
    <div className="pricing-card__contents">
      <div
        className="pricing-card__plan"
        style={{
          background: props.cardColor
        }}
      >
        <div className="pricing-card__plan__name">
          {props.planName}
        </div>
        <div className="pricing-card__plan__price">
          {props.planPricing}
        </div>
        <div className="pricing-card__plan__details">
          {props.planDetails}
        </div>
      </div>
      <div className="pricing-card__body">
        {
          props.featureList.map(feature => (
            <div className="pricing-card__body__access" key={feature}>
              {feature}
            </div>
          ))
        }
      </div>
      <div className="pricing-card__button-area">
        {props.buttonText && (
          <button
            onClick={props.onClick}
            style={{
              background: props.cardColor
            }}
          >
            {props.buttonText}
          </button>
        )}
      </div>
    </div>
  </div>
);

PricingCard.propTypes = {
  cardColor: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  planName: PropTypes.string.isRequired,
  planPricing: PropTypes.string.isRequired,
  planDetails: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func.isRequired,
  featureList: PropTypes.arrayOf(PropTypes.string).isRequired,
  backdropColor: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

PricingCard.defaultProps = {
  active: false,
};

export default PricingCard;
