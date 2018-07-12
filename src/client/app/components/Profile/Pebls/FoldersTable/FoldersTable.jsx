import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Measure from 'react-measure';

import ItemTypes from '../itemTypes';
import { moveFolderToFolder, viewFolder } from '../../../../action/page.js';

class FoldersTable extends Component {


  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
  }

  viewFolder = (e, id, folderDepth) => {
    e.stopPropagation();
    this.props.viewFolder(id, folderDepth);
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
                  <li key={folder._id} className="profile-folders__list-item" onClick={e => this.viewFolder(e, folder._id, folderDepth)}>
                    <h3
                      className="profile-folders__title"
                    >
                      {folder.title}</h3>
                    <p className="profile-folders__sub-title"> {folder.files.length} files </p>
                  </li>))}
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
  viewFolder
}, dispatch);

export default connect(null, mapDispatchToProps)(FoldersTable);
