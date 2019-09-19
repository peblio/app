import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Progress } from 'reactstrap';

import {
  setDashboardView,
  setDocumentSort,
  setDocumentView,
  searchByTitle,
  clearSearchByTitle,
  toggleAddNewMenu,
  loadMemoryConsumed
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
  constructor(props) {
    super(props);
    this.titleSearch = {};
  }

  componentWillMount() {
    this.props.loadMemoryConsumed();
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
    e.preventDefault();
    const folderId = this.props.selectedFolderIds[this.props.selectedFolderIds.length - 1];
    e.stopPropagation();
    this.props.createFolder('New Folder', folderId);
  }

  createPage = (e) => {
    e.preventDefault();
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

  searchByTitle = (e) => {
    if (e.target.value === '') {
      this.props.clearSearchByTitle();
      return;
    }
    this.props.searchByTitle(e.target.value);
  }

  clearSearchText = () => {
    this.titleSearch.value = '';
    this.props.clearSearchByTitle();
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

getMemoryConsumedMessage = () => {
  const memoryConsumedInMegaBytes = (this.props.memoryConsumed / 1000000).toFixed(2);
  return (
    <span>
      Memory Consumed
      {' '}
      {memoryConsumedInMegaBytes}
      {' '}
      {'MB out of 1024 MB'}
      <Progress value={memoryConsumedInMegaBytes * 100 / 1024} color="success" />
    </span>
  );
};

render() {
  const navClass = classNames('dashboard-nav__container ', {
    'dashboard-nav__white-back': (this.props.dashboardView === 'documents')
  });
  return (
    <div className={classNames(navClass)}>
      {this.props.container !== 'profile' &&
      (
        <div className="dashboard-nav__lower-container dashboard-nav__top-nav">
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
          {this.getMemoryConsumedMessage()}
        </div>
      )}

      {this.props.dashboardView === 'documents' && (
        <div className="dashboard-nav__lower-container">
          <div className="dashboard-nav__dropdown-container">
            <div className="dashboard-nav__dropdown-sub-container">
              <input
                type="text"
                className="dashboard-nav__title-search"
                placeholder="Search"
                onChange={this.searchByTitle}
                ref={(ts) => { this.titleSearch = ts; }}
              />
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
                  <option value="title">Title</option>
                  <option value="-updatedAt">Updated At</option>
                </select>
              </div>
              <button className="dashboard-nav__clear-link" onClick={this.clearSearchText}>
                Clear Filter
              </button>
            </div>
            <div className="dashboard-nav__new-container">
              <button
                className="dashboard-nav__add-button"
                onMouseDown={this.props.toggleAddNewMenu}
                onKeyDown={this.props.toggleAddNewMenu}
                onBlur={() => {
                  setTimeout(() => {
                    if (this.props.isAddNewMenuOpen) {
                      this.props.toggleAddNewMenu();
                    }
                  }, 50);
                }}
              >
                <PlusIcon />
                {' '}
                Add New
              </button>
              {this.props.isAddNewMenuOpen && (
                <ul className="dashboard-nav__sub-button-container">
                  <button
                    className="dashboard-nav__add-sub-button"
                    onMouseDown={this.createPage}
                    onKeyDown={this.createPage}
                  >
                  File
                  </button>
                  <button
                    className="dashboard-nav__add-sub-button"
                    onMouseDown={this.createFolder}
                    onKeyDown={this.createFolder}
                  >
                    Folder
                  </button>
                </ul>
              )}
            </div>
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
  isAddNewMenuOpen: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  setDocumentSort: PropTypes.func.isRequired,
  setDashboardView: PropTypes.func.isRequired,
  setDocumentView: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleAddNewMenu: PropTypes.func.isRequired,
  searchByTitle: PropTypes.func.isRequired,
  clearSearchByTitle: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  loadMemoryConsumed: PropTypes.func.isRequired,
  memoryConsumed: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
    dashboardView: state.dashboard.dashboardView,
    documentView: state.dashboard.documentView,
    parentFolderId: state.dashboard.parentFolderId,
    isAddNewMenuOpen: state.dashboard.isAddNewMenuOpen,
    selectedFolderIds: state.page.selectedFolderIds,
    userType: state.user.type,
    memoryConsumed: state.dashboard.memoryConsumed,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createFolder,
  createPage,
  setDashboardView,
  setDocumentView,
  setDocumentSort,
  searchByTitle,
  clearSearchByTitle,
  toggleAddNewMenu,
  loadMemoryConsumed
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
