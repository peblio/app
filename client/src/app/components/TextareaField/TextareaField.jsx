import React from 'react';
import './textareaField.scss';

const InputField = ({
  label,
  state,
  placeholder,
  containerWidth,
  setState,
  textareaHeight,
  ...props
}) => {
  return (
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
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        style={{ height: textareaHeight }}
      />
    </div>
  );
};

export default InputField;
