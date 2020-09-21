import React from 'react';
import PropTypes from 'prop-types';

import InfoIcon from '../../images/info-circle.svg';

import './infoBubble.scss';

const InfoBubble = ({ children, iconStyle, boxStyle, ...props }) => (
  <div className="info-bubble" {...props}>
    <div className="info-bubble__icon" style={iconStyle}>
      <InfoIcon />
    </div>
    <div className="info-bubble__box" style={boxStyle}>
      {children}
    </div>
  </div>
);

InfoBubble.propTypes = {
  children: PropTypes.element.isRequired,
  iconStyle: PropTypes.shape({}),
  boxStyle: PropTypes.shape({}),
};

InfoBubble.defaultProps = {
  iconStyle: {},
  boxStyle: {},
};

export default InfoBubble;
