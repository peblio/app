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
    const { isOver } = this.props;
    const tableClassName = classNames('pages__table', { 'pages__table--drop-target': isOver });
    return (
      <table className={tableClassName}>
        <tbody >
          {this.props.pages.map((page) => {
            const link = `/pebl/${page.id}`;
            return (
              <li className="pebls__file" key={page.id}>
                <a className="pebls__link" href={link}>
                  <div className="pebls__wrap">
                    <img
                      src="https://placekitten.com/300/200"
                      className="pebls__iframe"
                    />
                  </div>
                  <p className="pebls__title">{page.title} </p>
                  <p >{formatDate(page.updatedAt)}</p>
                </a>
              </li>
            );
          }
        )}
        </tbody>
      </table>
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
