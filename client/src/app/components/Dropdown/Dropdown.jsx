import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './dropdown.scss';

import onClickOutside from 'react-onclickoutside';

const Dropdown = ({
  state,
  setState,
  options,
  placeholder,
  ...props
}) => {
  const [triggered, setTriggered] = useState(false);
  const [selected, setSelected] = useState(state || placeholder);
  const [showTooltip, setShowTooltip] = useState(false);
  Dropdown.handleClickOutside = () => setTriggered(false);

  const handleSelect = (option) => {
    queueMicrotask(() => setSelected(option.name));
    queueMicrotask(() => setTriggered(false));
    queueMicrotask(() => setState(option.value));
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
      className='dropdown'
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseExit}
      {...props}
    >
      <button
        ref={textRef}
        className='dropdown__trigger'
        onClick={
          () => {
            setTriggered(true);
          }}
      >
        <span>
          {selected}
        </span>
      </button>
      <button
        className='dropdown__trigger dropdown__trigger--svg'
        onClick={
          () => {
            setTriggered(true);
          }}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.33334 13.3333L16 20L22.6667 13.3333H9.33334Z'
            fill='black'
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
            <button
              className='dropdown__option'
              key={option.value}
              onClick={_ => handleSelect(option)}
            >
              {option.name}
            </button>
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
  options: PropTypes.arrayOf(PropTypes.objectOf({
    name: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
