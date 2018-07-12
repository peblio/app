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
    const { folderDepth } = this.props;
    const { width } = this.state;
    return (
      <section className="profile-folders__container">
        <ul className="profile-folders__list">
          {this.props.folders.map(folder =>
            (
              <FolderRow key={folder._id} folder={folder} folderDepth={folderDepth} width={width} />
                ))}
        </ul>
      </section>

    );
  }
}

FoldersTable.propTypes = {
  folderDepth: PropTypes.number.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};


const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(null, mapDispatchToProps)(FoldersTable);
