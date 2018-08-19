import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Folders from '../Folders/Folders.jsx';
import Pages from '../Pages/Pages.jsx';
import { viewFolder, clearSelectedFolders } from '../../../../action/page';
import compareTimestamps from '../../../../utils/compare-timestamps';

class ProfileLevel extends Component {
  static defaultProps = {
    folderDepth: 0,
    folderId: undefined,
    folder: {}
  }

  handleClick = () => {
    if (this.props.folder.parent) {
      this.props.viewFolder(this.props.folder.parent, this.props.folderDepth);
    } else {
      this.props.clearSelectedFolders(0);
    }
  }

  render() {
    const { childFolders, childPages, folderDepth, folderId, folder } = this.props;
    const title = folderId ? folder.title : 'All Work';
    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div className="profile-pebls__level">
        <h1 className="profile-pebls__heading">
          {title}
        </h1>

        {this.props.folderDepth > 0 && (
          <button
            className="profile-pebls__back"
            onClick={this.handleClick}
          >
           &#9664; Back
          </button>
        )}
        <h2 className="profile-pebls__sub-heading">folders</h2>
        {childFolders.length > 0 &&
        <Folders folders={childFolders} folderId={folderId} folderDepth={folderDepth} />
        }
        <h2 className="profile-pebls__sub-heading">files</h2>
        <Pages pages={childPages} folderId={folderId} />
      </div>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );
  }
}

ProfileLevel.propTypes = {
  childFolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  childPages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  clearSelectedFolders: PropTypes.func.isRequired,
  folderDepth: PropTypes.number,
  folderId: PropTypes.string,
  folder: PropTypes.shape({ parent: PropTypes.string }).isRequired,
  viewFolder: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  childFolders: Object.values(state.page.folders.byId)
    .filter(folder => folder.parent === ownProps.folderId)
    .sort(compareTimestamps),
  childPages: Object.values(state.page.pages.byId)
    .filter(page => page.folder === ownProps.folderId)
    .sort(compareTimestamps),
  folder: state.page.folders.byId[ownProps.folderId]
});

const mapDispatchToProps = dispatch => bindActionCreators({
  viewFolder,
  clearSelectedFolders,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLevel);
