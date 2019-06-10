import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setDashboardView,
  setDocumentSort,
  setDocumentView,
  toggleAddNewMenu
} from '../../../action/dashboard.js';
import {
  createFolder,
  createPage
} from '../../../action/page.js';
import PeblioLogo from '../../../images/logo.svg';
import Block from '../../../images/block.svg';
import Line from '../../../images/stack.svg';
import PlusIcon from '../../../images/plus.svg';

import './nav.scss';

class Nav extends React.Component {
  componentWillMount() {
    if (window.location.pathname.includes('profile')) {
      this.props.setDashboardView('profile');
    }
  }

  renderListItem=(displayText, viewName) => {
    const isCurrentDashboardView = this.props.dashboardView === viewName;
    return (
      <li className="dashboard-nav__list-item">
        <button
          className={`dashboard-nav__button ${(isCurrentDashboardView) ? 'dashboard-nav__button--selected' : ''}`}
          onClick={() => { this.props.setDashboardView(viewName); }}
        >
          {displayText}
        </button>
      </li>
    );
  }

  createFolder = (e) => {
    const folderId = this.props.selectedFolderIds[this.props.selectedFolderIds.length - 1];
    e.stopPropagation();
    this.props.createFolder('New Folder', folderId);
    // this.hideNewFolderDropdown();
  }

  createPage = (e) => {
    let folderId = null;
    if (this.props.selectedFolderIds.length > 0) {
      folderId = this.props.selectedFolderIds[this.props.selectedFolderIds.length - 1];
    }
    e.stopPropagation();
    this.props.createPage('New Page', folderId);
  }

  setDocumentSort = (e) => {
    this.props.setDocumentSort(e.target.value);
  }

renderDocumentViewList = (displaySVG, documentView) => {
  const svgIcon = [];
  const isCurrentDocumentView = this.props.documentView === documentView;
  if (documentView === 'line') {
    svgIcon.push(<Line alt="line view" />);
  } else {
    svgIcon.push(<Block alt="block view" />);
  }
  return (
    <div className={
      `dashboard-nav__button dashboard-nav__radio ${(isCurrentDocumentView)
        ? 'dashboard-nav__radio--selected' : ''
      }`}
    >
      <label
        className="dashboard-nav__label"
        htmlFor={`dashboard-nav${documentView}`}
      >
        <input
          required
          type="radio"
          className="dashboard-nav__hide"
          name="documentView"
          value={documentView}
          id={`dashboard-nav${documentView}`}
          onChange={(e) => {
            this.props.setDocumentView(documentView);
          }}
        />
        {svgIcon}
      </label>
    </div>
  );
}

render() {
  return (
    <div className="dashboard-nav__container">
      {this.props.container !== 'profile' &&
      (
        <div className="dashboard-nav__lower-container">
          <ul className="dashboard-nav__list">
            {this.renderListItem('Documents', 'documents')}
            {this.renderListItem('Account', 'account')}
            {this.renderListItem('Trash', 'trash')}
            {this.props.userType === 'student' || this.renderListItem('Profile', 'profile')}
          </ul>
          {(this.props.dashboardView === 'documents' || this.props.dashboardView === 'trash') && (
            <div className="dashboard-nav__list">
              {this.renderDocumentViewList(PeblioLogo, 'block')}
              {this.renderDocumentViewList(PeblioLogo, 'line')}
            </div>
          )}
          {(this.props.dashboardView === 'profile') && (
            <a
              className="dashboard-nav__profile-link"
              target="_blank"
              rel="noopener noreferrer"
              href={`/profile/${this.props.name}`}
            >
              View Profile
            </a>
          )}
        </div>
      )}

      {this.props.dashboardView === 'documents' && (
        <div className="dashboard-nav__lower-container">
          <div className="dashboard-nav__dropdown-container">
            <div className="dashboard-nav__sub-container">
              <p className="dashboard-nav__dropdown-label">
              Arrange By
              </p>
              <select
                className="dashboard-nav__dropdown"
                id="dashboard-sort"
                name="dashboard-sort"
                onChange={this.setDocumentSort}
                ref={(dashboardSort) => { this.dashboardSort = dashboardSort; }}
                value={this.props.documentSort}
              >
                <option value="-updatedAt">Updated At</option>
                <option value="title">Title</option>
              </select>
            </div>
            <button
              className="dashboard-nav__add-button"
              onClick={this.props.toggleAddNewMenu}
            >
              <PlusIcon />
            Add New
            </button>
            {this.props.isAddNewMenuOpen && (
              <div className="dashboard-nav__sub-container">
                <button
                  className="dashboard-nav__add-button"
                  onClick={this.createFolder}
                >
                  New Folder
                </button>
                <button
                  className="dashboard-nav__add-button"
                  onClick={this.createPage}
                >
                  New Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
}

Nav.propTypes = {
  container: PropTypes.string.isRequired,
  createFolder: PropTypes.func.isRequired,
  createPage: PropTypes.func.isRequired,
  dashboardView: PropTypes.string.isRequired,
  documentSort: PropTypes.string.isRequired,
  documentView: PropTypes.string.isRequired,
  location: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  setDocumentSort: PropTypes.func.isRequired,
  setDashboardView: PropTypes.func.isRequired,
  setDocumentView: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  userType: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
    dashboardView: state.dashboard.dashboardView,
    documentView: state.dashboard.documentView,
    parentFolderId: state.dashboard.parentFolderId,
    isAddNewMenuOpen: state.dashboard.isAddNewMenuOpen,
    selectedFolderIds: state.page.selectedFolderIds,
    userType: state.user.type
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createFolder,
  createPage,
  setDashboardView,
  setDocumentView,
  setDocumentSort,
  toggleAddNewMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
