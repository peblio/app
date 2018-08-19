import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfileLevel from './ProfileLevel/ProfileLevel.jsx';
import {
  fetchAllPages,
  viewFolder,
} from '../../../action/page';

require('./pebls.scss');

class Pebls extends React.Component {
  componentDidMount() {
    this.props.fetchAllPages(this.props.profileName);
  }

  componentDidUpdate() {
    if (this.containerEl && this.props.selectedFolderIds.length >= 2) {
      this.containerEl.scrollLeft = this.containerEl.scrollWidth - this.containerEl.clientWidth;
    }
  }

  render() {
    const { selectedFolderIds } = this.props;
    return (
      <div className="profile-pebls__container" ref={(el) => { this.containerEl = el; }}>

        <ProfileLevel />
        {selectedFolderIds.map((selectedFolderId, index) => (
          <ProfileLevel key={selectedFolderId} folderId={selectedFolderId} folderDepth={index + 1} />
        ))}

      </div>
    );
  }
}

Pebls.propTypes = {
  fetchAllPages: PropTypes.func.isRequired,
  profileName: PropTypes.string.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  selectedFolderIds: state.page.selectedFolderIds
});

const mapDispatchToProps = dispatch => bindActionCreators({
  viewFolder,
  fetchAllPages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pebls);
