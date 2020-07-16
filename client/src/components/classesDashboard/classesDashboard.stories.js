import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';

import ClassesDashboard from '../../app/components/Mockups/ClassesDashboard/ClassesDashboard';

// A super-simple mock of a redux store
const store = {
  getState: () => {
    return {
    };
  },
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

export default {
  title: 'Classes Dashboard',
  decorators: [story => <Provider store={store}>{story()}</Provider>],
};

export const classesDashboard = () => (
  <ClassesDashboard />
);
