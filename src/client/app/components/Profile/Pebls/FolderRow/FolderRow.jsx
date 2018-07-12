import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames';

import ItemTypes from '../itemTypes';
import formatDate from '../../../../utils/format-date.js';
import {
  viewFolder
} from '../../../../action/page.js';


class FolderRow extends Component {

  viewFolder = (e) => {
    e.stopPropagation();
    console.log(this.props.folder._id);
    console.log(this.props.folderDepth);
    this.props.viewFolder(this.props.folder._id, this.props.folderDepth);
  }

  render() {
    const {
      folder
    } = this.props;
    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <li className="profile-folders__list-item" onClick={this.viewFolder}>
        <h3
          className="profile-folders__title"
        >
          {folder.title}</h3>
        <p className="profile-folders__sub-title"> {folder.files.length} files </p>
      </li>


      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );
  }
}

FolderRow.propTypes = {

  folder: PropTypes.shape({ _id: PropTypes.string, title: PropTypes.string }).isRequired,
  folderDepth: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  /* eslint-disable react/no-unused-prop-types */

  viewFolder: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isSelected: state.page.selectedFolderIds.includes(ownProps.folder._id)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  viewFolder
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(FolderRow);
