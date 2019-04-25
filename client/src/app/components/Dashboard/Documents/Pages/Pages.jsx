import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import formatDate from '../../../../utils/format-date';
import './pages.scss';
import DeleteIcon from '../../../../images/trash.svg';
import DuplicateIcon from '../../../../images/duplicate.svg';
import { deletePage, duplicatePage, viewPage } from '../../../../action/page';

class Pages extends Component {
  deletePage = (e, id) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this file?')) { // eslint-disable-line no-restricted-globals
      this.props.deletePage(id);
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
    console.log(this);
    return (
      <ul className="profile-pebl__list">
        {this.props.pages.map(page => (

          <li className="profile-pebl__container" key={page.id}>
            <a
              className="profile-pebl__link profile-pebl__overlay"
              target="_blank"
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
              <button
                className="pages__icon"
                onClick={e => this.deletePage(e, page._id)}
                data-test="delete-pebl"
              >
                <DeleteIcon alt="delete page" />
              </button>
              <button
                className="pages__icon"
                onClick={e => this.duplicatePage(e, page)}
                data-test="duplicate-pebl"
              >
                <DuplicateIcon alt="duplicate page" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  deletePage,
  duplicatePage,
  viewPage
}, dispatch);

export default connect(null, mapDispatchToProps)(Pages);
