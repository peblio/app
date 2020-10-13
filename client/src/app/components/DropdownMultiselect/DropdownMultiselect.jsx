import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import CheckboxUnselected from '../../images/checkboxUnselected.svg';
import CheckboxSelected from '../../images/checkboxSelected.svg';

import './dropdownMultiselect.scss';

const DropdownMultiselect = ({
  placeholder,
  options,
  disabled,
  selected,
  setSelected,
  label,
  ...props
}) => {
  const [triggered, setTriggered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef();

  const closeOptionsHandler = (e) => {
    if (e.target.className !== 'multiselect-dropdown__option') {
      setTriggered(false);
      document.removeEventListener('click', closeOptionsHandler);
    }
  };


  const handleOnMouseEnter = (e) => {
    if ((textRef.current && textRef.current.clientWidth < textRef.current.scrollWidth) ||
    selected.length !== 0) {
      setShowTooltip(true);
    }
  };

  const handleOnMouseExit = () => {
    if (setShowTooltip) {
      setShowTooltip(false);
    }
  };

  const handleSelect = (option) => {
    if (selected.includes(option.value)) {
      // const filterSelected = selected.filter(selection => selection !== option.value);
      setSelected(selected.filter(selection => selection !== option.value));
    } else {
      setSelected([...selected, option.value]);
    }
  };

  useEffect(() => () => {
    document.removeEventListener('click', closeOptionsHandler);
  }, []);

  return (
    <div className="multiselect-dropdown" {...props}>
      {
        label && (
          <div className="dropdown__label">
            {label}
          </div>
        )}
      <button
        className="multiselect-dropdown__trigger"
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
          {(selected.length !== 0 && `${selected.length} selected`) || placeholder}
        </span>
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
            className="multiselect-dropdown__tooltip"
          >
            {placeholder}
          </span>
        )
      }
      <div className={`multiselect-dropdown__options ${triggered ? 'multiselect-dropdown__options--active' : ''}`}>
        {options.map(option => (
          <div
            className="multiselect-dropdown__option-container"
            key={option.name}
          >
            <span className={`multiselect-dropdown__option-container__checkbox ${
              selected.includes(option.value) ? 'multiselect-dropdown__option-container__checkbox--selected' : ''}`
            }
            >
              <CheckboxUnselected />
              <CheckboxSelected />
            </span>
            <button
              type="button"
              className='multiselect-dropdown__option'
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </button>
            <span className="multiselect-dropdown__tooltip multiselect-dropdown__tooltip--option">
              {option.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


DropdownMultiselect.defaultProps = {
  disabled: false,
  label: '',
};

DropdownMultiselect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelected: PropTypes.func.isRequired
};

export default DropdownMultiselect;
