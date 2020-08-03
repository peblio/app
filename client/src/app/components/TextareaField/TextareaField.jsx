import React from 'react';
import PropTypes from 'prop-types';
import './textareaField.scss';

const TextareaField = ({
  label,
  state,
  placeholder,
  onChange,
  style: {
    containerWidth,
    textareaHeight
  },
  ...props
}) => (
  <div
    className='textarea-field'
    style={{ width: containerWidth }}
    {...props}
  >
    {
      label && (
        <label htmlFor={label} className='textarea-field__label'>
          {label}
        </label>
      )
    }
    <textarea
      name={label}
      value={state}
      className='textarea-field__text-box'
      onChange={onChange}
      placeholder={placeholder}
      style={{ height: textareaHeight }}
    />
  </div>
);

TextareaField.propTypes = {
  label: PropTypes.string,
  state: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.shape({
    textareaHeight: PropTypes.string.isRequired,
    containerWidth: PropTypes.string.isRequired
  }).isRequired
};

TextareaField.defaultProps = {
  label: ''
};

export default TextareaField;
