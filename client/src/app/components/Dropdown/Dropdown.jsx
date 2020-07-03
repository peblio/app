import React, { useState } from 'react';
import './dropdown.scss';
import onClickOutside from 'react-onclickoutside';

const Dropdown = ({ state, setState, options, placeholder, ...props }) => {
  const [triggered, setTriggered] = useState(false);
  const [selected, setSelected] = useState(state || placeholder);
  
  Dropdown.handleClickOutside = () => setTriggered(false);

  const handleStelect = (option) => {
    queueMicrotask(_=>setSelected(option.name));
    queueMicrotask(_=>setTriggered(false));
    queueMicrotask(_=>setState(option.value));
  }

  return (
    <div
      className='dropdown'
      onClick={() => {
        setTriggered(true);
      }}
      {...props}
    >
      {selected}
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

      {triggered && (
        <div className='dropdown__options'>
          {options.map((option) => (
            <p 
              className='dropdown__option'
              onClick={()=>handleStelect(option)}
            >
              {option.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside
}

export default onClickOutside(Dropdown, clickOutsideConfig);
