import React, { Component } from 'react';
import PropTypes from 'prop-types';

import history from '../../../../../utils/history';

class Folders extends Component {
  redirectToFolder = (e, shortId) => {
    e.stopPropagation();
    this.props.jumpToFolderByShortId(shortId);
    history.push(`/${this.props.container}/${this.props.profileName}/folder/${shortId}`);
  }

  render() {
    return (
      <section className="profile-folders__container">
        <ul className="profile-folders__list">
          {this.props.folders.map(folder => (
            <li // eslint-disable-line
              key={folder._id}
              className="profile-folders__list-item"
              onClick={e => this.redirectToFolder(e, folder.shortId)}
            >
              <h3
                className="profile-folders__title"
              >
                {folder.title}
              </h3>
              <p className="profile-folders__sub-title">
                {folder.files.length}
                {' '}
                files
              </p>
            </li>))}
        </ul>
      </section>

    );
  }
}

Folders.propTypes = {
  container: PropTypes.string.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  profileName: PropTypes.string.isRequired,
  jumpToFolderByShortId: PropTypes.string.isRequired
};

export default Folders;
