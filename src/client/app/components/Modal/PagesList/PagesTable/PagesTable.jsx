import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Measure from 'react-measure';

import PageRow from '../PageRow/PageRow.jsx';
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
    folderId: undefined,
  }

  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
  }

  handleResize = (contentRect) => {
    const { width } = contentRect.bounds;
    this.setState({ width });
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    const { width } = this.state;
    const tableClassName = classNames('pages__table', { 'pages__table_drop-target': isOver });
    return connectDropTarget(
      <table className={tableClassName}>
        <Measure bounds onResize={this.handleResize}>
          {({ measureRef }) => (
            <tbody ref={measureRef}>
              <tr className="pages__headrow">
                <th className="pages__header pages__header_title">Files</th>
                {width > 350 &&
                  <React.Fragment>
                    <th className="pages__header pages__header_uppercase">Date Created</th>
                    <th className="pages__header pages__header_uppercase">Last Update</th>
                  </React.Fragment>
                }
                <th className="pages__header"></th>
              </tr>
              {this.props.pages.map(page => <PageRow key={page._id} page={page} width={width} />)}
            </tbody>
          )}
        </Measure>
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

const DroppablePagesTable = DropTarget(ItemTypes.PAGE, pagesTableTarget, collect)(PagesTable);

const mapDispatchToProps = dispatch => bindActionCreators({
  movePageToFolder
}, dispatch);

export default connect(null, mapDispatchToProps)(DroppablePagesTable);
