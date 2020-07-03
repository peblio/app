import React from 'react';
import Button from '../../app/components/Button/Button';

export default { title: 'Button' };

export const closeButton = () => <Button>Close</Button>;

export const primaryButton = () => (
  <React.Fragment>
    <Button className="primary">
      Create class
    </Button>
    <Button className="primary" disabled>
      Disabled Primary
    </Button>
  </React.Fragment>
);

export const secondaryButton = () => (
  <React.Fragment>
    <Button className="secondary">
      Create class
    </Button>
    <Button className="secondary" disabled>
      Disabled Secondary
    </Button>
  </React.Fragment>
);
