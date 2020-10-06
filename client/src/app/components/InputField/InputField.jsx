import React from 'react';
import PropTypes from 'prop-types';
import './inputField.scss';

const InputField = ({
  label,
  state,
  placeholder,
  containerWidth,
  onChange,
  error,
  ...props
}) => (
  <div className='input-field' style={{ width: containerWidth }}>
    {
      label &&
      (
        <label htmlFor={label} className='input-field__label'>
          {label}
        </label>
      )
    }
    <input
      name={label}
      value={state}
      className='input-field__text-box'
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
    { error && (
      <span className="input-field__error">
        {error}
      </span>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string,
  state: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  containerWidth: PropTypes.string.isRequired,
  error: PropTypes.string,
};

InputField.defaultProps = {
  label: '',
  error: '',
};

export default InputField;
