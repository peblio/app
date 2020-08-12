import React, { useState } from 'react';
import ToggleButton from '../../app/components/ToggleButton/ToggleButton';

export default { title: 'ToggleButton' };

export const toggleButton = () => {
  const [state, setState] = useState(false);

  return (
    <React.Fragment>
      <ToggleButton
        state={state}
        onClick={() => { setState(val => !val); }}
        style={{ marginBottom: '8px' }}
      >
        Create class
      </ToggleButton>
      <ToggleButton
        state={state}
        onClick={() => { setState(val => !val); }}
        style={{ marginRight: '8px' }}
        disabled
      >
        Create class
      </ToggleButton>
    </React.Fragment>
  );
};
