import React from 'react';
import { Button } from '@storybook/react/demo';
import InfiniteLoopDetectableCode from '../../app/components/App/Shared/EditorComponents/CodeOutput/InfiniteLoopDetectableCode.js';

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

export const loopedCode = () => (
  <InfiniteLoopDetectableCode />
);
