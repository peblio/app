import React from 'react';
import PropTypes from 'prop-types';
import FileModal from './FileModal.jsx';
import InsertToolbar from './InsertToolbar.jsx';
import ToolbarLogo from '../images/logo.svg';
import EditorSVG from '../images/editor.svg';
import CheckSVG from '../images/check.svg';
import PreviewOnSVG from '../images/previewOnSVG.svg';
import PreviewOffSVG from '../images/previewOffSVG.svg';


class MainToolbar extends React.Component {
  render() {
    let saveButtonText = 'Saved';
    if (this.props.unsavedChanges) {
      if (this.props.canEdit) {
        saveButtonText = 'Save';
      } else {
        saveButtonText = 'Fork';
      }
    }

    return (
      <div>
        <div className="mainToolbar">
          <div className="mainToolbar__div-left">
            <div className="logo_toolbar">
              <ToolbarLogo alt="logo in toolbar" />
            </div>

            <div className="fileModal__container">
              <button className="upperToolbar__dropdown" onClick={this.props.toggleFileDropdown}>
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
            className="mainToolbar__title"
            placeholder="Title"
            type="text"
            value={this.props.pageTitle}
            onChange={this.props.setPageTitle}
          ></input>
          <div className="mainToolbar__div-right">
            <label className="mainToolbar__preview" htmlFor="mainToolbar__checkbox">
              <input
                id="mainToolbar__checkbox"
                onChange={this.props.togglePreviewMode}
                type="checkbox"
                checked={this.props.preview}
              />
              <span className="mainToolbar__previewOn">
                <PreviewOnSVG alt="add code editor" />
              </span>
              <span className="mainToolbar__previewOff">
                <PreviewOffSVG alt="add code editor" />
              </span>
              <span className="mainToolbar__previewTitle">Preview</span>

            </label>
            {(this.props.projectID() || this.props.unsavedChanges) &&
              (
                <button className="mainToolbar__button" onClick={this.props.savePage}>
                  {saveButtonText}
                </button>
              )
            }
            <button className="mainToolbar__button" onClick={this.props.viewShareModal}>
              Share
            </button>
            { this.props.name ? (
              <div>
                <a className="mainToolbar__button" href="/logout">Logout</a>
                <p className="mainToolbar__welcome">
                      Welcome {this.props.name}!
                </p>
              </div>
            ) : (
              <div>
                <button className="mainToolbar__button" onClick={this.props.viewLoginModal}>Log In</button>
                <button className="mainToolbar__button" onClick={this.props.viewSignUpModal}>Sign Up</button>
              </div>
            ) }
          </div>
        </div>
        { this.props.preview ||
          <InsertToolbar
            addCodeEditor={this.props.addCodeEditor}
            addTextEditor={this.props.addTextEditor}
            addIframe={this.props.addIframe}
          />
        }
      </div>
    );
  }
}

MainToolbar.propTypes = {
  addCodeEditor: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  isFileDropdownOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  projectID: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  togglePreviewMode: PropTypes.func.isRequired,
  unsavedChanges: PropTypes.bool.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
};

export default MainToolbar;
