import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './tabSwitcher.scss';

const TabSwitcher = ({ tabs, className }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={`tab-switcher ${className}`}>
      <div className={`tab-switcher__tabs ${className}__tabs`}>
        {
          tabs.map((tab, index) => (
            <button
              className={`
                tab-switcher__tabs__tab
                ${index === selectedTab
              ? (`tab-switcher__tabs__tab--selected ${className}__tabs__tab--selected`)
              : ''} ${className}__tabs__tab`}
              key={tab.label}
              onClick={() => { setSelectedTab(index); }}
            >
              {tab.label}
            </button>
          ))
        }
      </div>
      <div className={`tab-switcher__selected-tab ${className}__selected-tab`}>
        {tabs[selectedTab].component}
      </div>
    </div>
  );
};

TabSwitcher.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired
  }).isRequired).isRequired,
  className: PropTypes.string
};

TabSwitcher.defaultProps = {
  className: ''
};

export default TabSwitcher;
