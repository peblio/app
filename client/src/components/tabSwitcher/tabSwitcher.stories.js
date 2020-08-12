import React from 'react';
import TabSwitcher from '../../app/components/TabSwitcher/TabSwitcher';

export default { title: 'TabSwitcher' };

export const lessonListCard = () => (
  <TabSwitcher
    tabs={[
      {
        label: 'Tab1',
        component: <p>Hello</p>
      }, {
        label: 'Tab2',
        component: <p>World</p>
      },
    ]}
  />
);
