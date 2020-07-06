import React from 'react';
import PropTypes from 'prop-types';
import './textareaField.scss';

const InputField = ({
  label,
  state,
  placeholder,
  containerWidth,
  setState,
  textareaHeight,
  ...props
}) => (
  <div
    className='textarea-field'
    style={{ width: containerWidth }}
    {...props}
  >
    <label htmlFor={label} className='textarea-field__label'>
      {label}
    </label>
    <textarea
      name={label}
      value={state}
      className='textarea-field__text-box'
      onChange={e => setState(e.target.value)}
      placeholder={placeholder}
      style={{ height: textareaHeight }}
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.node.isRequired,
  setState: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  containerWidth: PropTypes.string.isRequired,
  textareaHeight: PropTypes.string.isRequired,
};

export default InputField;
