import React from 'react';
import PropTypes from 'prop-types';

require('./liveRefreshPage.scss');

export default class LiveRefreshPage extends React.Component {
  getMessage() {
    return (<div>This page has been updated by the author. Would you like to reload the page to view the changes?</div>);
  }

  getMessageForAuthor() {
    return (<div>It looks like you made changes to this page in another window. Would you like to refresh this page to view the latest version?</div>);
  }

  doLiveRefresh = () => {
    this.props.allowLiveRefresh();
    this.props.closeLiveRefreshPageModal();
  }

  render() {
    return (
      <div className="liveRefreshPage-modal__content">
        <h1 className="liveRefreshPage-modal__title">
          {!this.props.showMessageForAuthor && this.getMessage()}
          {this.props.showMessageForAuthor && this.getMessageForAuthor()}
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
  closeLiveRefreshPageModal: PropTypes.func.isRequired,
  showMessageForAuthor: PropTypes.bool.isRequired
};
