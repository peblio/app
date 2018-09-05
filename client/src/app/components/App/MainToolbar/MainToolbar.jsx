import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import history from '../../../utils/history';
import FileModal from './FileModal/FileModal.jsx';
import InsertToolbar from './InsertToolbar/InsertToolbar.jsx';
import ToolbarLogo from '../../../images/logo.svg';
import CheckSVG from '../../../images/check.svg';
import AccountSVG from '../../../images/account.svg';

require('./mainToolbar.scss');

class MainToolbar extends React.Component {
  logout = () => {
    this.props.logoutUser().then(() => {
      history.push('/');
    });
  }

  render() {
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
      'upper-toolbar__dropdown-open': this.props.isFileDropdownOpen
    });

    return (
      <div className="main-toolbar__container">

        <div className="main-toolbar">
          <div className="main-toolbar__div-left">
            <div className="logo_toolbar">
              <ToolbarLogo alt="logo in toolbar" />
            </div>
            <div>
              <button className="upper-toolbar__dropdown" onClick={this.props.viewExamplesModal}>
              Examples
              </button>
            </div>
            <div
              className="file-modal__container"
              onBlur={() => {
                setTimeout(() => {
                  this.props.isFileDropdownOpen && this.props.toggleFileDropdown();
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
                <FileModal
                  name={this.props.name}
                  savePage={this.props.savePage}
                  toggleFileDropdown={this.props.toggleFileDropdown}
                  viewPagesModal={this.props.viewPagesModal}
                />
              )}
            </div>

          </div>
          <input
            className="main-toolbar__title"
            placeholder="Title"
            type="text"
            value={this.props.pageTitle}
            onChange={this.props.setPageTitle}
          />
          <div className="main-toolbar__div-right">
            <div className="main-toolbar__div-right-inside">
              <span className="main-toolbar__preview-title">Edit Mode</span>

              <label className="main-toolbar__preview" htmlFor="main-toolbar__checkbox">
                <input
                  id="main-toolbar__checkbox"
                  onChange={this.props.togglePreviewMode}
                  type="checkbox"
                  checked={this.props.preview}
                />
                <div className="main-toolbar__slider"></div>
              </label>
              <button className="main-toolbar__save" onClick={this.props.savePage}>
                {saveButtonText}
              </button>
              <div className="main-toolbar__spacer"></div>
              <button className="main-toolbar__button" onClick={this.props.viewShareModal}>
              Share
              </button>
              <div className="main-toolbar__spacer"></div>

              {this.props.name ? (
                <div>
                  <button
                    onMouseDown={this.props.toggleAccountDropdown}
                    onKeyDown={this.props.toggleAccountDropdown}
                    onBlur={() => {
                      setTimeout(() => {
                        this.props.isAccountDropdownOpen && this.props.toggleAccountDropdown();
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
                              className="file-modal__link"
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`/user/${this.props.name}`}
                            >
                              Profile
                            </a>
                          </li>
                        )}
                        <li className="main-toolbar__list-item">
                          <button
                            className="file-modal__link"
                            onMouseDown={this.logout}
                            onKeyDown={this.logout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <button className="main-toolbar__button" onClick={this.props.viewLoginModal} data-test="show-login-modal">Log In</button>
                  <button className="main-toolbar__button" onClick={this.props.viewSignUpModal}>Sign Up</button>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.props.preview || (
          <InsertToolbar
            addCodeEditor={this.props.addCodeEditor}
            addQuestionEditor={this.props.addQuestionEditor}
            addTextEditor={this.props.addTextEditor}
            addIframe={this.props.addIframe}
            addImage={this.props.addImage}
            isPreferencesPanelOpen={this.props.isPreferencesPanelOpen}
            togglePreferencesPanel={this.props.togglePreferencesPanel}
          />
        )}
      </div>
    );
  }
}

MainToolbar.propTypes = {
  addCodeEditor: PropTypes.func.isRequired,
  addQuestionEditor: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  isFileDropdownOpen: PropTypes.bool.isRequired,
  isAccountDropdownOpen: PropTypes.bool.isRequired,
  isPreferencesPanelOpen: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  projectID: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  toggleAccountDropdown: PropTypes.func.isRequired,
  togglePreviewMode: PropTypes.func.isRequired,
  togglePreferencesPanel: PropTypes.func.isRequired,
  unsavedChanges: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  viewExamplesModal: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
};

export default MainToolbar;
