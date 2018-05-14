import React from 'react';
import PropTypes from 'prop-types';
import FileModal from './../Modals/FileModal.jsx';
import InsertToolbar from './InsertToolbar.jsx';
import ToolbarLogo from '../../images/logo.svg';
import CheckSVG from '../../images/check.svg';
import AccountSVG from '../../images/account.svg';

class MainToolbar extends React.Component {
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

    return (
      <div className="main-toolbar__container">

        <div className="main-toolbar">
          <div className="main-toolbar__div-left">
            <div className="logo_toolbar">
              <ToolbarLogo alt="logo in toolbar" />
            </div>
            <button className="upper-toolbar__dropdown" onClick={this.props.viewExamplesModal}>
            Examples
            </button>
            <div className="file-modal__container">
              <button className="upper-toolbar__dropdown" onClick={this.props.toggleFileDropdown}>
              File
              </button>
              { this.props.isFileDropdownOpen &&
                <FileModal
                  name={this.props.name}
                  savePage={this.props.savePage}
                  toggleFileDropdown={this.props.toggleFileDropdown}
                  viewPagesModal={this.props.viewPagesModal}
                />
              }
            </div>

          </div>
          <input
            className="main-toolbar__title"
            placeholder="Title"
            type="text"
            value={this.props.pageTitle}
            onChange={this.props.setPageTitle}
          ></input>
          <div className="main-toolbar__div-right">
            <div className="main-toolbar__div-right-inside">
              <label className="main-toolbar__preview" htmlFor="main-toolbar__checkbox">
                <input
                  id="main-toolbar__checkbox"
                  onChange={this.props.togglePreviewMode}
                  type="checkbox"
                  checked={this.props.preview}
                />
                <div className="main-toolbar__slider"></div>
              </label>
              <span className="main-toolbar__preview-title">Edit Mode</span>
              <button className="main-toolbar__save" onClick={this.props.savePage}>
                {saveButtonText}
              </button>
              <button className="main-toolbar__button" onClick={this.props.viewShareModal}>
              Share
              </button>
              { this.props.name ? (
                <div>
                  <button onClick={this.props.toggleAccountDropdown} className="main-toolbar__account-button">
                    <AccountSVG alt="account man" />
                  </button>
                  { this.props.isAccountDropdownOpen &&
                  <div className="main-toolbar__account">
                    <p className="main-toolbar__welcome">
                      Hi {this.props.name}!
                    </p>
                    <a className="file-modal__link" href="/logout">Logout</a>

                  </div>
              }
                </div>
            ) : (
              <div>
                <button className="main-toolbar__button" onClick={this.props.viewLoginModal}>Log In</button>
                <button className="main-toolbar__button" onClick={this.props.viewSignUpModal}>Sign Up</button>
              </div>
            ) }
            </div>
          </div>
        </div>
        { this.props.preview ||
          <InsertToolbar
            addCodeEditor={this.props.addCodeEditor}
            addQuestionEditor={this.props.addQuestionEditor}
            addTextEditor={this.props.addTextEditor}
            addIframe={this.props.addIframe}
            addImage={this.props.addImage}
          />
        }
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
  name: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  projectID: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  toggleAccountDropdown: PropTypes.func.isRequired,
  togglePreviewMode: PropTypes.func.isRequired,
  unsavedChanges: PropTypes.bool.isRequired,
  viewExamplesModal: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
};

export default MainToolbar;
