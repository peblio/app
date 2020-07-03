import React from 'react';
import Button from '../../app/components/Button/Button';

export default { title: 'Button' };

export const closeButton = () => <Button>Close</Button>;

export const primaryButton = () => (
  <Button className="primary">
    Create class
  </Button>
);

export const secondaryButton = () => (
  <Button className="secondary">
    Cancel
  </Button>
);
