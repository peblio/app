import React from 'react';
import IconButton from '../../app/components/IconButton/IconButton';

import PeblIcon from '../../app/images/pebl.svg';
import TrashIcon from '../../app/images/trash.svg';

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

export const iconButtonNoLabel = () => (
  <IconButton icon={<TrashIcon />} onClick={() => { console.log('button'); }} />
);
