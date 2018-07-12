import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { viewFolder } from '../../../../action/page.js';

class Folders extends Component {

  viewFolder = (e, id, folderDepth) => {
    e.stopPropagation();
    this.props.viewFolder(id, folderDepth);
  }

  render() {
    const { folderDepth } = this.props;
    return (
      <section className="profile-folders__container">
        <ul className="profile-folders__list">
          {this.props.folders.map(folder =>

                (
                  <li // eslint-disable-line
                    key={folder._id}
                    className="profile-folders__list-item"
                    onClick={e => this.viewFolder(e, folder._id, folderDepth)}
                  >
                    <h3
                      className="profile-folders__title"
                    >
                      {folder.title}
                    </h3>
                    <p className="profile-folders__sub-title">
                      {folder.files.length} files
                    </p>
                  </li>))}
        </ul>
      </section>

    );
  }
}

Folders.propTypes = {
  folderDepth: PropTypes.number.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  viewFolder: PropTypes.func.isRequired
};


const mapDispatchToProps = dispatch => bindActionCreators({
  viewFolder
}, dispatch);

export default connect(null, mapDispatchToProps)(Folders);
