import React from 'react';
import IconButton from '../../app/components/IconButton/IconButton';

import ForkSVG from '../../app/images/fork.svg';

export default { title: 'IconButton' };

export const iconButton = () => (
  <IconButton icon={<ForkSVG />} onClick={() => { console.log('button'); }}>
    IconButton
  </IconButton>
);

export const iconButtonDisabled = () => (
  <IconButton icon={<ForkSVG />} disabled>
    IconButton
  </IconButton>
);
