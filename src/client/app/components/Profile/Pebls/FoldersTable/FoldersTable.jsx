import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Measure from 'react-measure';

import ItemTypes from '../itemTypes';
import { moveFolderToFolder, viewFolder } from '../../../../action/page.js';
import FolderRow from '../FolderRow/FolderRow.jsx';

class FoldersTable extends Component {


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
    const tableClassName = classNames('pages__table', { 'pages__table--drop-target': isOver });
    return (
      <ul>
        {this.props.folders.map(folder =>
        //   (
        //   <li className="pages__row" onClick={e => this.viewFolder(e, folder._id, folderDepth)}>
        //     <h2
        //       className="pages__input"
        //     >
        //       {folder.title}</h2>
        //   </li>
        // ))}
          (
            <FolderRow key={folder._id} folder={folder} folderDepth={folderDepth} width={width} />
              ))}

      </ul>

    );
  }
}

FoldersTable.propTypes = {

  folderDepth: PropTypes.number.isRequired,
  /* eslint-disable react/no-unused-prop-types */

  /* eslint-enable react/no-unused-prop-types */
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};


const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(null, mapDispatchToProps)(FoldersTable);
