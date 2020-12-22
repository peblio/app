import React from 'react';
import PropTypes from 'prop-types';
import history from '../../../../utils/history';
import LearnMoreModal from '../LearnMoreModal/LearnMoreModal';

import './upgradeView.scss';

class UpgradeView extends React.Component {
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
              <button className="upgrade-view__sub-header__learnmore-link" onClick={this.props.toggleLearnMoreModal}>learn more</button>
              &nbsp; about Peblio's classroom tools!
            </h2>
          </div>
        </div>
        {this.props.learnMoreModal && <LearnMoreModal closeLearnMoreModal={this.props.toggleLearnMoreModal} />}
      </React.Fragment>
    );
  }
}

UpgradeView.propTypes = {
  learnMoreModal: PropTypes.bool.isRequired,
  toggleLearnMoreModal: PropTypes.func.isRequired,
};

export default UpgradeView;
