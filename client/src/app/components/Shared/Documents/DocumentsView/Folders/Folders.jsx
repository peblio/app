import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import history from '../../../../../utils/history';
import DeleteIcon from '../../../../../images/trash.svg';
import ShareIcon from '../../../../../images/share.svg';
import RenameIcon from '../../../../../images/rename.svg';


class Folders extends Component {
  redirectToFolder = (e, shortId) => {
    console.log('in redirect');
    e.stopPropagation();
    this.props.jumpToFolderByShortId(shortId);
    history.push(`/${this.props.container}/${this.props.profileName}/folder/${shortId}`);
  }

  deleteFolder = (e, id) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this folder?')) { // eslint-disable-line no-restricted-globals
      this.props.deleteFolder(id);
    }
  }

  shareFolder = (e, shortId) => {
    const url = `${window.location.origin}/profile/${this.props.profileName}/folder/${shortId}`;
    this.props.setShareURL(url);
    this.props.viewShareModal();
  }

  renameFolder = (e, id) => {
    e.stopPropagation();
    this.props.renameFolder(id, e.target.value);
  }

  startRenameFolder = (e, key) => {
    const title = document.getElementById(`folderTitle-${key}`);
    title.focus();
    e.stopPropagation();
  }

  render() {
    const documentViewCLass = classNames('profile-folders__list', {
      'document-line': (this.props.documentView === 'line'),
      'document-block': (this.props.documentView === 'block')
    });
    return (
      <section className="profile-folders__container">
        <ul className={classNames(documentViewCLass)}>
          <div className="profile-folders__li-heading-container">
            <h4 className="profile-folders__li-heading">
            name
            </h4>
            <h4 className="profile-folders__li-heading">
            Last Modified
            </h4>
            <h4 className="profile-folders__li-heading">
            # Of files
            </h4>
          </div>
          {this.props.folders.map((folder, key) => (
            <li // eslint-disable-line
              key={folder._id}
              className="profile-folders__list-item"
              onClick={e => this.redirectToFolder(e, folder.shortId)}
            >
              <h3
                className="profile-folders__title"
              >
                <input
                  className="pages__input"
                  ref={(input) => { this.folderTitle = input; }}
                  type="text"
                  defaultValue={folder.title}
                  id={`folderTitle-${key}`}
                  onBlur={e => this.renameFolder(e, folder._id)}
                  onClick={e => this.startRenameFolder(e, key)}
                />
              </h3>
              <h3
                className="profile-folders__line-title"
              >
                {moment(folder.updatedAt).format('DD/MMM/YYYY')}
              </h3>
              <div className="profile-folders__info">
                <p className="profile-folders__sub-info">
                  {folder.files && folder.files.length}
                  {' '}
                  files
                </p>
                {this.props.container === 'dashboard' && (
                  <div className="profile-folders__sub-info">
                    <button
                      className="profile-pebl__icon"
                      onClick={e => this.deleteFolder(e, folder._id)}
                      data-test="delete-pebl"
                    >
                      <DeleteIcon alt="delete page" />
                    </button>
                    <button
                      className="profile-pebl__icon"
                      onClick={e => this.shareFolder(e, folder.shortId)}
                      data-test="share-folder"
                    >
                      <ShareIcon alt="share page" />
                    </button>
                    <button
                      className="profile-pebl__icon"
                      onClick={e => this.startRenameFolder(e, key)}
                      data-test="share-folder"
                    >
                      <RenameIcon alt="rename folder" />
                    </button>
                  </div>
                )}
              </div>
            </li>))}
        </ul>
      </section>

    );
  }
}

Folders.propTypes = {
  container: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  documentView: PropTypes.string.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  profileName: PropTypes.string.isRequired,
  jumpToFolderByShortId: PropTypes.string.isRequired
};

export default Folders;
