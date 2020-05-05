import React from 'react';
import { Button } from '@storybook/react/demo';

export default { title: 'Button' };

export const closeButton = () => <Button>Close</Button>;

export const actionButton = () => (
  <Button>
    <span role="img" aria-label="so cool">
      Get Started
    </span>
  </Button>
);

export const insertButton = () => (
  <Button>
    <span role="img" aria-label="so cool">
      Editor
    </span>
  </Button>
);
