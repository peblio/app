import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageRow from '../PageRow';
import ItemTypes from '../itemTypes';
import { movePageToFolder } from '../../../../action/page.js';

const pagesTableTarget = {
  drop(props, monitor) {
    const { pageId } = monitor.getItem();
    props.movePageToFolder(pageId, props.folderId);
  }
};

function collect(_connect, monitor) {
  return {
    connectDropTarget: _connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true })
  };
}

class PagesTable extends Component {
  static defaultProps = {
    folderId: null,
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <table className="pages__table">
        <tbody>
          <tr className="pages__headrow">
            <th className="pages__header">Files</th>
            <th className="pages__header">Created</th>
            <th className="pages__header">Updated</th>
            <th className="pages__header"></th>
          </tr>
          {this.props.pages.map(page => <PageRow key={page._id} page={page} />)}
        </tbody>
      </table>
    );
  }
}

PagesTable.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  folderId: PropTypes.string,
  movePageToFolder: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const DroppablePagesTable = DropTarget(ItemTypes.PAGE, pagesTableTarget, collect)(PagesTable);

const mapDispatchToProps = dispatch => bindActionCreators({
  movePageToFolder
}, dispatch);

export default connect(null, mapDispatchToProps)(DroppablePagesTable);
