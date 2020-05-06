import React from 'react';
import StyledDropdown from './StyledDropdown';

export default { title: 'Dropdown' };

export const styledDropdown = () => {
  const dropdownOption = [
    {
      name: 'Audi',
      value: '1',
      key: '1',
    },
    {
      name: 'BMW',
      value: '2',
      key: '2',
    },
    {
      name: 'Citroen',
      value: '3',
      key: '3',
    }
  ];
  return (
    <div>
      Lets see if this is read
      {/* <select>
        <option value="0">Select car:</option>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
        <option value="3">Citroen</option>
        <option value="4">Ford</option>
        <option value="5">Honda</option>
        <option value="6">Jaguar</option>
        <option value="7">Land Rover</option>
        <option value="8">Mercedes</option>
        <option value="9">Mini</option>
        <option value="10">Nissan</option>
        <option value="11">Toyota</option>
        <option value="12">Volvo</option>
      </select> */}
      <StyledDropdown options={dropdownOption} />
    </div>
  );
};
