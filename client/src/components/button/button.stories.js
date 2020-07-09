import React from 'react';
import Button from '../../app/components/Button/Button';

export default { title: 'Button' };

export const primaryButton = () => (
  <React.Fragment>
    <Button className="primary" style={{ marginRight: '8px' }}>
      Create class
    </Button>
    <Button className="primary" disabled>
      Disabled Primary
    </Button>
  </React.Fragment>
);

export const secondaryButton = () => (
  <React.Fragment>
    <Button className="secondary" style={{ marginRight: '8px' }}>
      Create class
    </Button>
    <Button className="secondary" disabled>
      Disabled Secondary
    </Button>
  </React.Fragment>
);
