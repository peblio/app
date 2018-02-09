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
    let saveButtonText = <CheckSVG alt="check svg" />;
    if (this.props.unsavedChanges) {
      if (this.props.canEdit) {
        saveButtonText = 'Save';
      } else {
        saveButtonText = 'Fork';
      }
    }

    return (
      <div className="main-toolbar__container">
        <div className="demo-notice">
          This is a demo version of Peblio. Feel free to play around but projects will not yet be permanently saved. <a target="_blank" href="http://peblio-splash-page.webflow.io/#contact">Contact us</a> with feedback. We would love to hear from you!
        </div>
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
            <label className="main-toolbar__preview" htmlFor="main-toolbar__checkbox">
              <input
                id="main-toolbar__checkbox"
                onChange={this.props.togglePreviewMode}
                type="checkbox"
                checked={this.props.preview}
              />
              <span className="main-toolbar__preview-on">
                <PreviewOnSVG alt="preview on" />
                <span className="main-toolbar__preview-title">Preview On</span>

              </span>
              <span className="main-toolbar__preview-off">
                <PreviewOffSVG alt="preview Off" />
                <span className="main-toolbar__preview-title">Preview Off</span>
              </span>

            </label>
            {(this.props.projectID() || this.props.unsavedChanges) &&
              (
                <button className="main-toolbar__save" onClick={this.props.savePage}>
                  {saveButtonText}
                </button>
              )
            }
            <button className="main-toolbar__button" onClick={this.props.viewShareModal}>
              Share
            </button>

            <button className="upper-toolbar__dropdown" onClick={this.props.toggleAccountDropdown}>
            ACCOUNT
            </button>
            { this.props.isAccountDropdownOpen &&
              <FileModal
                name={this.props.name}
                savePage={this.props.savePage}
                toggleFileDropdown={this.props.toggleFileDropdown}
                viewPagesModal={this.props.viewPagesModal}
              />
            }
            { this.props.name ? (
              <a className="main-toolbar__button" href="/logout">Logout</a>
              // <p className="main-toolbar__welcome">
              //       Welcome {this.props.name}!
              // </p>

            ) : (
              <div>
                <button className="main-toolbar__button" onClick={this.props.viewLoginModal}>Log In</button>
                <button className="main-toolbar__button" onClick={this.props.viewSignUpModal}>Sign Up</button>
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
  viewExamplesModal: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
};

export default MainToolbar;
