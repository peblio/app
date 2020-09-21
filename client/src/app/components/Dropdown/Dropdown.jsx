import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './dropdown.scss';
import { useEffect } from 'react';

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

  const textRef = useRef();

  const handleSelect = (option) => {
    if (option.onClick) {
      option.onClick();
    }
    if (setState) {
      setTimeout(() => setState(() => option.value), 0);
    }
    if (setShowTooltip) {
      setShowTooltip(false);
    }
    if (className !== 'btn') {
      setTimeout(() => setSelected(option.name), 0);
    }
    setTimeout(() => setTriggered(false), 0);
  };


  const handleOnMouseEnter = (e) => {
    if (textRef.current && textRef.current.clientWidth < textRef.current.scrollWidth) {
      setShowTooltip(true);
    }
  };

  const handleOnMouseExit = () => {
    if (setShowTooltip) {
      setShowTooltip(false);
    }
  };

  const closeOptionsHandler = () => {
    setTriggered(false);
    document.removeEventListener('click', closeOptionsHandler);
  };

  useEffect(() => () => {
    document.removeEventListener('click', closeOptionsHandler);
  }, []);

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
            if (!triggered) {
              document.addEventListener('click', closeOptionsHandler);
            }
            setTriggered(value => !value);
          }}
      >
        <span ref={textRef}>
          {selected}
        </span>
        {
          className === 'btn' && (
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
          <span
            className="dropdown__tooltip"
          >
            {selected}
          </span>
        )
      }

      <div className={`dropdown__options ${triggered ? 'dropdown__options--active' : ''}`}>
        {options.map(option => (
          <div
            className="dropdown__option-container"
            key={option.value}
          >
            <button
              type="button"
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
    </div>
  );
};

Dropdown.propTypes = {
  state: PropTypes.node,
  setState: PropTypes.func,
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
  className: '',
  state: null,
  setState: null
};

export default Dropdown;
