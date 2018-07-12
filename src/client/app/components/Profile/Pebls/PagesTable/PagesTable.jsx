import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Measure from 'react-measure';

import ItemTypes from '../itemTypes';
import formatDate from '../../../../utils/format-date';
import { movePageToFolder } from '../../../../action/page.js';


class PagesTable extends Component {
  static defaultProps = {
    folderId: undefined,
  }


  render() {
    return (
      <section className="profile-pages__container">
        <ul className="profile-pages__list">
          {this.props.pages.map((page) => {
            const link = `/pebl/${page.id}`;
            return (

              <li className="profile-pages__list-item" key={page.id}>
                <a className="profile-pages__link" href={link} target="_blank">
                  <h3 className="profile-pages__title">{page.title} </h3>
                  <p className="profile-pages__sub-title">
                    last update                                {formatDate(page.updatedAt)}
                  </p>
                </a>
              </li>
            );
          }
      )}</ul>
      </section>
    );
  }
}

PagesTable.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  /* eslint-disable react/no-unused-prop-types */
  folderId: PropTypes.string,
  isOver: PropTypes.bool.isRequired,
  movePageToFolder: PropTypes.func.isRequired,
  /* eslint-enable react/no-unused-prop-types */
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  movePageToFolder
}, dispatch);

export default connect(null, mapDispatchToProps)(PagesTable);
