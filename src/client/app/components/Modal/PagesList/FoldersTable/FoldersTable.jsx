import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Measure from 'react-measure';

import FolderRow from '../FolderRow/FolderRow.jsx';
import ItemTypes from '../itemTypes';
import { moveFolderToFolder } from '../../../../action/page.js';

const foldersTableTarget = {
  drop(props, monitor) {
    const { folderId } = monitor.getItem();
    props.moveFolderToFolder(folderId, props.folderId);
  }
};

function collect(_connect, monitor) {
  return {
    connectDropTarget: _connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true })
  };
}

class FoldersTable extends Component {
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
    const { connectDropTarget, folderDepth, isOver } = this.props;
    const { width } = this.state;
    const tableClassName = classNames('pages__table', { 'pages__table_drop-target': isOver });
    return connectDropTarget(
      <table className={tableClassName}>
        <Measure bounds onResize={this.handleResize}>
          {({ measureRef }) => (
            <tbody ref={measureRef}>
              <tr className="pages__headrow">
                <th className="pages__header pages__header_title">Folders</th>
                {width > 350 &&
                  <React.Fragment>
                    <th className="pages__header pages__header_uppercase">Date Created</th>
                    <th className="pages__header pages__header_uppercase">Last Update</th>
                  </React.Fragment>
                }
                <th className="pages__header"></th>
              </tr>
              {this.props.folders.map(folder => (
                <FolderRow key={folder._id} folder={folder} folderDepth={folderDepth} width={width} />
              ))}
            </tbody>
          )}
        </Measure>
      </table>
    );
  }
}

FoldersTable.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  folderDepth: PropTypes.number.isRequired,
  /* eslint-disable react/no-unused-prop-types */
  folderId: PropTypes.string,
  isOver: PropTypes.bool.isRequired,
  moveFolderToFolder: PropTypes.func.isRequired,
  /* eslint-enable react/no-unused-prop-types */
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const DroppableFoldersTable = DropTarget(ItemTypes.FOLDER, foldersTableTarget, collect)(FoldersTable);

const mapDispatchToProps = dispatch => bindActionCreators({
  moveFolderToFolder
}, dispatch);

export default connect(null, mapDispatchToProps)(DroppableFoldersTable);
