import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import './pages.scss';
import DeleteIcon from '../../../../../images/trash.svg';
import DuplicateIcon from '../../../../../images/duplicate.svg';
import { trashPage, duplicatePage } from '../../../../../action/page';

class Pages extends Component {
  trashPage = (e, id) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to trash this file?')) { // eslint-disable-line no-restricted-globals
      this.props.trashPage(id);
    }
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

  render() {
    const documentViewCLass = classNames('profile-pebl__list', {
      'document-line': (this.props.documentView === 'line'),
      'document-block': (this.props.documentView === 'block')
    });
    return (
      <ul className={classNames(documentViewCLass)}>
        {this.props.pages && (
          <div className="profile-pebl__li-heading-container">
            <h4 className="profile-pebl__li-heading">
            name
            </h4>
            <h4 className="profile-pebl__li-heading">
            Last Modified
            </h4>
          </div>
        )}
        {this.props.pages && this.props.pages.map(page => (

          <li className="profile-pebl__container" key={page.id}>
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
              {page.title}
            </h1>
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
                </div>
              )
              }
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

Pages.propTypes = {
  container: PropTypes.string.isRequired,
  documentView: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  trashPage: PropTypes.func.isRequired,
  duplicatePage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    documentView: state.dashboard.documentView
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  duplicatePage,
  trashPage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
