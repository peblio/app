import React from 'react';
import IconButtonDropdown from '../../app/components/IconButtonDropdown/IconButtonDropdown';

import OptionsIcon from '../../app/images/options.svg';

export default { title: 'IconButtonDropdown' };


export const iconButtonDropdown = () => (
  <IconButtonDropdown
    icon={<OptionsIcon />}
    options={[
      {
        name: 'Option 1',
        onClick: () => { console.log('Option 1'); }
      }, {
        name: 'Option 2',
        onClick: () => { console.log('Option 2'); }
      }
    ]}
  />
);

export const iconButtonDropdownRight = () => (
  <IconButtonDropdown
    optionsPosition='right'
    style={{
      marginLeft: '200px'
    }}
    icon={<OptionsIcon />}
    options={[
      {
        name: 'Option 1',
        onClick: () => { console.log('Option 1'); }
      }, {
        name: 'Option 2',
        onClick: () => { console.log('Option 2'); }
      }
    ]}
  />
);
