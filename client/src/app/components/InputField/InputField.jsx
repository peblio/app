import React from 'react';
import './inputField.scss';

const InputField = ({
  label,
  state,
  placeholder,
  containerWidth,
  setState,
  ...props
}) => {
  return (
    <div className='input-field' style={{width:containerWidth}}>
      <label htmlFor={label} className='input-field__label'>
        {label}
      </label>
      <input
        name={label}
        value={state}
        className='input-field__text-box'
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputField;
