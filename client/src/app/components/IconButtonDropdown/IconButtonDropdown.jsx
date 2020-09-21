import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './iconButtonDropdown.scss';

const IconButtonDropdown = ({
  icon,
  options,
  optionsContainerWidth,
  optionsPosition,
  ...props
}) => {
  const [triggered, setTriggered] = useState(false);

  const handleSelect = (option) => {
    option.onClick();
  };

  const closeOptionsHandler = () => {
    setTriggered(false);
    document.removeEventListener('click', closeOptionsHandler);
  };

  useEffect(() => () => {
    document.removeEventListener('click', closeOptionsHandler);
  }, []);

  return (
    <div className="icon-button-dropdown" {...props}>
      <button
        className={`icon-button-dropdown__icon ${triggered ? 'active' : ''}`}
        onClick={() => {
          if (!triggered) {
            document.addEventListener('click', closeOptionsHandler);
          }
          setTriggered(value => !value);
        }}
      >
        {icon}
      </button>
      <div
        className={`icon-button-dropdown__options ${triggered ? 'icon-button-dropdown__options--active' : ''}
        ${optionsPosition}`}
        style={{ width: optionsContainerWidth }}
      >
        {options.map(option => (
          <div
            className="icon-button-dropdown__option-container"
            key={option.name}
          >
            <button
              type="button"
              className='icon-button-dropdown__option'
              onClick={() => handleSelect(option)}
            >
              {option.icon}
              {option.name}
            </button>
            <span className="icon-button-dropdown__tooltip icon-button-dropdown__tooltip--option">
              {option.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

IconButtonDropdown.propTypes = {
  icon: PropTypes.element.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })).isRequired,
  optionsContainerWidth: PropTypes.string,
  optionsPosition: PropTypes.oneOf(['left', 'right'])
};

IconButtonDropdown.defaultProps = {
  optionsContainerWidth: '174px',
  optionsPosition: 'left'
};

export default IconButtonDropdown;
