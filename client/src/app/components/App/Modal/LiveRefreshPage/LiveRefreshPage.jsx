import React from 'react';
import PropTypes from 'prop-types';

require('./liveRefreshPage.scss');

export default class LiveRefreshPage extends React.Component {
  doLiveRefresh = () => {
    this.props.allowLiveRefresh();
    this.props.closeLiveRefreshPageModal();
  }

  render() {
    return (
      <div className="liveRefreshPage-modal__content">
        <h1 className="liveRefreshPage-modal__title">
          Page has been updated. Do you want to refresh with latest changes?
        </h1>
        <button
          className="liveRefreshPage-modal__button"
          onClick={this.doLiveRefresh}
        >
          Refresh
        </button>
        <button
          className="liveRefreshPage-modal__button"
          onClick={this.props.closeLiveRefreshPageModal}
        >
          Cancel
        </button>
      </div>
    );
  }
}

LiveRefreshPage.propTypes = {
  allowLiveRefresh: PropTypes.func.isRequired,
  closeLiveRefreshPageModal: PropTypes.func.isRequired
};
