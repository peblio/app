import React from 'react';
import history from '../../../../utils/history';


import './upgradeView.scss';

class UpgradeView extends React.Component {
  redirectToPricingPage = () => {
    history.push('/pricing');
  }

  render() {
    return (
      <React.Fragment>
        <div className="upgrade-view">
          <div className="upgrade-view__container">
            <h1 className="upgrade-view__header">
              Created Classes
            </h1>
            <h2 className="upgrade-view__sub-header">
              <a className="upgrade-view__sub-header__payment-link" href="/pricing">Upgrade now</a>
              &nbsp;to create your own classes or&nbsp;
              <button className="upgrade-view__sub-header__learnmore-link">learn more</button>
              {' '}
              about Peblio's classroom tools!
            </h2>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

UpgradeView.propTypes = {
};

export default UpgradeView;
