import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import './dropdown.scss';

const Dropdown = ({
  state,
  setState,
  options,
  placeholder,
  disabled,
  className,
  ...props
}) => {
  const [triggered, setTriggered] = useState(false);
  const [selected, setSelected] = useState(state || placeholder);
  const [showTooltip, setShowTooltip] = useState(false);
  Dropdown.handleClickOutside = () => setTriggered(false);

  const handleSelect = (option) => {
    queueMicrotask(() => setSelected(option.name));
    queueMicrotask(() => setTriggered(false));
    if (option.onClick) {
      option.onClick();
    }
    if (setState) {
      setState(option.value);
    }
    if (setShowTooltip) {
      setShowTooltip(false);
    }
  };

  const textRef = useRef();

  const handleOnMouseEnter = () => {
    if (textRef.current && textRef.current.clientWidth < textRef.current.scrollWidth) {
      setShowTooltip(true);
    }
  };

  const handleOnMouseExit = () => {
    if (setShowTooltip) {
      setShowTooltip(false);
    }
  };

  return (
    <div
      className={`dropdown ${className || ' '}`}
      {...props}
    >
      <button
        className={`dropdown__trigger ${className || ' '}`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseExit}
        onFocus={handleOnMouseEnter}
        onBlur={handleOnMouseExit}
        disabled={disabled}
        type="button"
        onClick={
          () => {
            setTriggered(value => !value);
          }}
      >
        <span ref={textRef}>
          {selected}
        </span>
        {
          className && (
            <span className="dropdown__divider"></span>
          )
        }
        <svg
          width='24'
          height='24'
          viewBox='0 0 32 32'
          fill='none'
          className={`${triggered && 'triggered'}`}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.33334 13.3333L16 20L22.6667 13.3333H9.33334Z'
          />
        </svg>
      </button>
      {
        showTooltip && (
          <span className="dropdown__tooltip">
            {selected}
          </span>
        )
      }

      {triggered && (
        <div className='dropdown__options'>
          {options.map(option => (
            <div
              className="dropdown__option-container"
              key={option.value}
            >
              <button
                className='dropdown__option'
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </button>
              <span className="dropdown__tooltip dropdown__tooltip--option">
                {option.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside
};

Dropdown.propTypes = {
  state: PropTypes.node.isRequired,
  setState: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]).isRequired,
    onClick: PropTypes.func
  })).isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

Dropdown.defaultProps = {
  disabled: false,
  className: ''
};

export default onClickOutside(Dropdown, clickOutsideConfig);
