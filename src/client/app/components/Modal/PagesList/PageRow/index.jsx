import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';

import ItemTypes from '../itemTypes';
import formatDate from '../../../../utils/format-date';
import { deletePage } from '../../../../action/page';
import DeleteIcon from '../../../../images/trash.svg';

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

class PageRow extends Component {
  deletePage = (e) => {
    e.stopPropagation();
    this.props.deletePage(this.props.page._id);
  }

  render() {
    // page.id is a shortid that is NOT the same thing as page._id
    const { connectDragSource, page } = this.props;
    const link = `/pebl/${page.id}`;
    return connectDragSource(
      <tr className="pages__row">
        <td className="pages__col" > <a className="pages__link" href={link}> {page.title} </a> </td>
        <td className="pages__col" > {formatDate(page.createdAt)} </td>
        <td className="pages__col" > {formatDate(page.updatedAt)} </td>
        <td className="pages__col" >
          <button className="pages__delete" onClick={this.deletePage}>
            <DeleteIcon alt="delete page" />
          </button>
        </td>
      </tr>
    );
  }
}

PageRow.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  page: PropTypes.shape({ _id: PropTypes.string }).isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({ deletePage }, dispatch);

const DraggablePageRow = DragSource(ItemTypes.PAGE, pageSource, collect)(PageRow);

export default connect(null, mapDispatchToProps)(DraggablePageRow);
