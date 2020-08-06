import React from 'react';
import IconButton from '../../app/components/IconButton/IconButton';

import PeblIcon from '../../app/images/pebl.svg';

export default { title: 'IconButton' };

export const iconButton = () => (
  <IconButton icon={<PeblIcon />} onClick={() => { console.log('button'); }}>
    IconButton
  </IconButton>
);

export const iconButtonDisabled = () => (
  <IconButton icon={<PeblIcon />} disabled>
    IconButton
  </IconButton>
);
