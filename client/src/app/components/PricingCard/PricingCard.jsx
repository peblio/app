import React from 'react';
import PropTypes from 'prop-types';

import './pricingCard.scss';

const PricingCard = props => (
  <div className="pricing-card">
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
          props.featureList.map((feature, index) => (
            <div className="pricing-card__body__access" key={index}>
              {feature}
            </div>
          ))
        }
      </div>
      <div className="pricing-card__button-area">
        <button
          onClick={props.onClick}
          style={{
            display: props.removeButton ? 'none' : 'block',
            background: props.cardColor
          }}
        >
          {props.buttonText}
        </button>
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
  removeButton: PropTypes.bool,
};

PricingCard.defaultProps = {
  removeButton: false
};

export default PricingCard;
