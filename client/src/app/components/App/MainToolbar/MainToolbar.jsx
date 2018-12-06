import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../../utils/history';
import FileMenu from './FileMenu/FileMenu.jsx';
import HelpMenu from './HelpMenu/HelpMenu.jsx';
import Preferences from '../Preferences/Preferences.jsx';
import InsertToolbar from './InsertToolbar/InsertToolbar.jsx';
import ToolbarLogo from '../../../images/logo.svg';
import CheckSVG from '../../../images/check.svg';
import AccountSVG from '../../../images/account.svg';
import PreferencesSVG from '../../../images/preferences.svg';

import { createNavigationContent } from '../../../action/navigation.js';
import { logoutUser } from '../../../action/user.js';
import { setPageTitle, togglePreviewMode, autoSaveUnsavedChanges } from '../../../action/page.js';
import * as mainToolbarActions from '../../../action/mainToolbar.js';

require('./mainToolbar.scss');

class MainToolbar extends React.Component {
  componentDidMount() {
    this.autoSaveTimeout = setInterval(() => {
      if (
        this.props.name && this.props.canEdit && this.props.unsavedChanges &&
        this.props.editorAutoSave && this.props.projectID()
      ) {
        this.props.autoSaveUnsavedChanges();
        this.props.createNavigationContent(this.props.layout);
        this.props.savePage();
      }
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.autoSaveTimeout);
  }

  logout = () => {
    this.props.logoutUser().then(() => {
      history.push('/');
    });
  }

  render() {
    const prefButtonClassName = classNames('main-toolbar__pref', {
      'main-toolbar__pref--open': this.props.isPreferencesPanelOpen
    });
    let saveButtonText = 'Fork';
    if (this.props.name) { // user is logged in
      if (this.props.canEdit) { // it is users sketch
        if (this.props.unsavedChanges) { // there are some unsaved changes
          saveButtonText = 'Save';
        } else { // there are no unsaved changes
          if (this.props.projectID()) { // eslint-disable-line
            // it is not a new sketch
            saveButtonText = <CheckSVG alt="check svg" />;
          } else { // it is a new sketch
            saveButtonText = 'Save';
          }
        }
      } else { // it is not users sketch
        saveButtonText = 'Fork';
      }
    } else { // user is not logged in
      if (this.props.projectID()) { // eslint-disable-line
        // it is not a new sketch
        saveButtonText = 'Fork';
      } else { // it is a new sketch
        saveButtonText = 'Save';
      }
    }

    const fileDropDownButtonClassName = classNames({
      'upper-toolbar__dropdown': !this.props.isFileDropdownOpen,
      'upper-toolbar__dropdown upper-toolbar__dropdown-open': this.props.isFileDropdownOpen
    });
    const helpDropDownButtonClassName = classNames({
      'upper-toolbar__dropdown': !this.props.isHelpDropdownOpen,
      'upper-toolbar__dropdown upper-toolbar__dropdown-open': this.props.isHelpDropdownOpen
    });

    return (
      <div className="main-toolbar__container">
        <div className="main-toolbar">
          <div className="main-toolbar__div-left">
            <a
              className="logo_toolbar"
              href="https://www.peblio.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ToolbarLogo alt="logo in toolbar" />
            </a>
            <div
              className="file-modal__container"
              onBlur={() => {
                setTimeout(() => {
                  if (this.props.isFileDropdownOpen) {
                    this.props.toggleFileDropdown();
                  }
                }, 50);
              }}
            >
              <button
                className={fileDropDownButtonClassName}
                onMouseDown={this.props.toggleFileDropdown}
                onKeyDown={this.props.toggleFileDropdown}
                data-test="toggle-file-dropdown"
              >
                File
              </button>
              {this.props.isFileDropdownOpen && (
                <FileMenu
                  savePage={this.props.savePage}
                />
              )}
            </div>

            <div
              className="file-modal__container"
              onBlur={() => {
                setTimeout(() => {
                  if (this.props.isHelpDropdownOpen) {
                    this.props.toggleHelpDropdown();
                  }
                }, 50);
              }}
            >
              <button
                className={helpDropDownButtonClassName}
                onMouseDown={this.props.toggleHelpDropdown}
                onKeyDown={this.props.toggleHelpDropdown}
                data-test="toggle-help-dropdown"
              >
                Help
              </button>
              {this.props.isHelpDropdownOpen && (
                <HelpMenu />
              )}
            </div>

          </div>
          <input
            className="main-toolbar__title"
            placeholder="Title"
            type="text"
            value={this.props.pageTitle}
            onChange={this.props.setPageTitle}
            readOnly={this.props.preview}
            data-test="main-toolbar__title"
          />
          {this.props.preview || (
            <span
              className="fa fa-pencil-alt main-toolbar__search-icon"
            >
            </span>
          )}
          <div className="main-toolbar__div-right">
            <div className="main-toolbar__div-right-inside">
              <span className="main-toolbar__preview-title">Edit Mode</span>

              <label className="main-toolbar__preview" htmlFor="main-toolbar__checkbox">
                <input
                  id="main-toolbar__checkbox"
                  onChange={this.props.togglePreviewMode}
                  type="checkbox"
                  checked={this.props.preview}
                  data-test="main-toolbar__edit-mode-toggle"
                />
                <div className="main-toolbar__slider"></div>
              </label>
              <button
                className="main-toolbar__save"
                onClick={this.props.savePage}
                data-test="main-toolbar__save-button"
              >
                {saveButtonText}
              </button>
              <div className="main-toolbar__spacer"></div>
              <button
                className="main-toolbar__button"
                onClick={this.props.viewShareModal}
                data-test="main-toolbar__share-button"
              >
              Share
              </button>
              <div className="main-toolbar__spacer"></div>
              <div className="main-toolbar__pref-container">
                <button
                  className="main-toolbar__button "
                  onMouseDown={this.props.togglePreferencesPanel}
                  data-test="main-toolbar__preferences-button"
                >
                  <PreferencesSVG
                    className={classNames(prefButtonClassName)}
                    alt="open preferences"
                  />
                </button>
                {this.props.isPreferencesPanelOpen && <Preferences />}
              </div>
              <div className="main-toolbar__spacer"></div>

              {this.props.name ? (
                <div>
                  <button
                    onMouseDown={this.props.toggleAccountDropdown}
                    onKeyDown={this.props.toggleAccountDropdown}
                    onBlur={() => {
                      setTimeout(() => {
                        if (this.props.isAccountDropdownOpen) {
                          this.props.toggleAccountDropdown();
                        }
                      }, 50);
                    }}
                    className="main-toolbar__account-button"
                    data-test="account-button"
                  >
                    <AccountSVG
                      alt="account profile"
                      className="account-man"
                    />
                  </button>
                  {this.props.isAccountDropdownOpen && (
                    <div className="main-toolbar__account">
                      <ul className="main-toolbar__list">
                        <li className="main-toolbar__list-item">
                          <p className="main-toolbar__welcome">
                            {`Hi ${this.props.name}!`}
                            <button
                              onMouseDown={this.props.toggleAccountDropdown}
                              onKeyDown={this.props.toggleAccountDropdown}
                              className="main-toolbar__account-button-clicked"
                            >
                              <AccountSVG
                                alt="account profile"
                                className="account-man__clicked"
                              />
                            </button>
                          </p>
                        </li>
                        {(this.props.userType === 'student') || (
                          <li className="main-toolbar__list-item">
                            <a
                              className="main-toolbar__account-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`/user/${this.props.name}`}
                              onMouseDown={(e) => { e.preventDefault(); }}
                              onKeyDown={(e) => { e.preventDefault(); }}
                              data-test="main-toolbar__profile-link"
                            >
                              Profile
                            </a>
                          </li>
                        )}
                        <li className="main-toolbar__list-item">
                          <button
                            className="main-toolbar__account-link"
                            onMouseDown={this.logout}
                            onKeyDown={this.logout}
                            data-test="main-toolbar__logout-button"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="main-toolbar__div-right-inside">
                  <button
                    className="main-toolbar__button"
                    onClick={this.props.viewLoginModal}
                    data-test="main-toolbar__login-button"
                  >
                    Log In
                  </button>
                  <div className="main-toolbar__spacer"></div>
                  <button
                    className="main-toolbar__button"
                    onClick={this.props.viewSignUpModal}
                    data-test="main-toolbar__signup-button"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.props.preview || (
          <InsertToolbar />
        )}
      </div>
    );
  }
}

MainToolbar.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  createNavigationContent: PropTypes.func.isRequired, // nav
  isFileDropdownOpen: PropTypes.bool.isRequired,
  isAccountDropdownOpen: PropTypes.bool.isRequired,
  isHelpDropdownOpen: PropTypes.bool.isRequired,
  isPreferencesPanelOpen: PropTypes.bool.isRequired,
  layout: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  logoutUser: PropTypes.func.isRequired, // user
  name: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  projectID: PropTypes.func.isRequired, // prop
  setPageTitle: PropTypes.func.isRequired, // page
  savePage: PropTypes.func.isRequired, // prop
  toggleHelpDropdown: PropTypes.func.isRequired, // main
  toggleFileDropdown: PropTypes.func.isRequired, // main
  toggleAccountDropdown: PropTypes.func.isRequired, // main
  togglePreviewMode: PropTypes.func.isRequired, // page
  togglePreferencesPanel: PropTypes.func.isRequired, // main
  unsavedChanges: PropTypes.bool.isRequired,
  autoSaveUnsavedChanges: PropTypes.func.isRequired, // page
  userType: PropTypes.string.isRequired,
  viewLoginModal: PropTypes.func.isRequired, // main
  viewShareModal: PropTypes.func.isRequired, // main
  viewSignUpModal: PropTypes.func.isRequired, // main
  editorAutoSave: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
  return {
    canEdit: state.user.canEdit,
    isFileDropdownOpen: state.mainToolbar.isFileDropdownOpen,
    isAccountDropdownOpen: state.mainToolbar.isAccountDropdownOpen,
    isHelpDropdownOpen: state.mainToolbar.isHelpDropdownOpen,
    isPreferencesPanelOpen: state.mainToolbar.isPreferencesPanelOpen,
    layout: state.page.layout,
    name: state.user.name,
    pageTitle: state.page.pageTitle,
    preview: state.page.preview,
    unsavedChanges: state.page.unsavedChanges,
    userType: state.user.type,
    editorAutoSave: state.preferences.editorAutoSave
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  createNavigationContent,
  logoutUser,
  setPageTitle,
  togglePreviewMode,
  autoSaveUnsavedChanges,
  ...mainToolbarActions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainToolbar);
