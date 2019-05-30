import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './pages.scss';
import DeleteIcon from '../../../../../images/trash.svg';
import DuplicateIcon from '../../../../../images/duplicate.svg';
import ShareIcon from '../../../../../images/share.svg';
import RenameIcon from '../../../../../images/rename.svg';

import {
  movePageToFolder,
} from '../../../../../action/page';

const ItemTypes = {
  PAGE: 'PAGE',
  FOLDER: 'FOLDER'
};

const pageSource = {
  beginDrag(props) {
    return { pageId: props.page._id };
  }
};

function collect(_connect, monitor) {
  return {
    connectDragSource: _connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Page extends Component {
  trashPage = (e, id) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to trash this file?')) { // eslint-disable-line no-restricted-globals
      this.props.trashPage(id);
    }
  }

  sharePage = (e, shortId) => {
    const url = `${window.location.origin}/pebl/${shortId}`;
    this.props.setShareURL(url);
    this.props.viewShareModal();
  }

  duplicatePage = (e, page) => {
    e.stopPropagation();
    const {
      title,
      heading,
      description,
      folder,
      editors,
      editorIndex,
      layout,
      tags
    } = page;

    this.props.duplicatePage(title, heading, description, folder, editors, editorIndex, layout, tags);
  }

  renamePage = (e, id) => {
    e.stopPropagation();
    this.props.renamePage(id, e.target.value);
  }

  startRenamePage = (e, key) => {
    const title = document.getElementById(`pageTitle-${key}`);
    title.focus();
    e.stopPropagation();
  }

  render() {
    const key = this.props.keyId;
    const { connectDragSource, isDragging, isSelected, page } = this.props;
    return connectDragSource(
      <li className="profile-pebl__container" key={page.id}>
        <div className="profile-pebl__sub-container">
          <a
            className="profile-pebl__link profile-pebl__overlay"
            target="_blank"
            rel="noopener noreferrer"
            href={`/pebl/${page.id}`}
          >
            <div>
              <h1
                className="profile-pebl__overlay-title"
              >
                {page.title}
              </h1>
              <p
                className="profile-pebl__overlay-desc"
              >
                {page.description}
              </p>
            </div>
            <p
              className="profile-pebl__overlay-author"
            >
              {page.userName}
            </p>
          </a>

          <img
            src={page.snapshotPath}
            className="profile-pebl__image"
            alt="snapshot of the pebl"
          />
          <h1
            className="profile-pebl__title"
          >
            <input
              className="pages__input"
              type="text"
              defaultValue={page.title}
              id={`pageTitle-${key}`}
              onBlur={e => this.renamePage(e, page._id)}
              onClick={e => this.startRenamePage(e, key)}
            />
          </h1>
        </div>
        <div className="profile-pebl__info">
          <p
            className="profile-pebl__sub-info"
          >
            {moment(page.updatedAt).format('DD/MMM/YYYY')}
          </p>
          {this.props.container === 'dashboard' && (
            <div
              className="profile-pebl__sub-info"
            >
              <button
                className="profile-pebl__icon"
                onClick={e => this.trashPage(e, page._id)}
                data-test="delete-pebl"
              >
                <DeleteIcon alt="delete page" />
              </button>
              <button
                className="profile-pebl__icon"
                onClick={e => this.duplicatePage(e, page)}
                data-test="duplicate-pebl"
              >
                <DuplicateIcon alt="duplicate page" />
              </button>
              <button
                className="profile-pebl__icon"
                onClick={e => this.sharePage(e, page.id)}
                data-test="share-folder"
              >
                <ShareIcon alt="share page" />
              </button>
              <button
                className="profile-pebl__icon"
                onClick={e => this.startRenamePage(e, key)}
                data-test="share-folder"
              >
                <RenameIcon alt="rename page" />
              </button>
            </div>
          )}
        </div>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    movePageToFolder
  }, dispatch);
}

Page.propTypes = {
  container: PropTypes.string.isRequired,
  duplicatePage: PropTypes.func.isRequired,
  keyId: PropTypes.number.isRequired,
  page: PropTypes.shape({}).isRequired,
  trashPage: PropTypes.func.isRequired,
  renamePage: PropTypes.func.isRequired,
  setShareURL: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
};

const DraggablePage = DragSource(ItemTypes.PAGE, pageSource, collect)(Page);

export default (connect(null, mapDispatchToProps)(DraggablePage));
