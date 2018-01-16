import React, { PropTypes } from 'react';
import FileModal from './FileModal.jsx';
import InsertToolbar from './InsertToolbar.jsx';
import ToolbarLogo from '../images/logo.svg';
import EditorSVG from '../images/editor.svg';

class MainToolbar extends React.Component {
  render() {
    return (
      <div>
        <div className="mainToolbar">
          { this.props.unsavedChanges &&
            <span className="mainToolbar__unsaved-ind"> *</span>
          }
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
            <label className="mainToolbar__preview" htmlFor="preview-checkbox">
              <input
                id="preview-checkbox"
                onChange={this.props.togglePreviewMode}
                type="checkbox"
                checked={this.props.preview}
              />
              Preview
            </label>

            { this.props.name ? (
              <div>
                <a className="mainToolbar__save" href="/logout">Logout</a>
                <p className="mainToolbar__welcome">
                      Welcome {this.props.name}!
                </p>
              </div>
            ) : (
              <div>
                <button className="mainToolbar__save" onClick={this.props.viewLoginModal}>Log In</button>
                <button className="mainToolbar__save" onClick={this.props.viewSignUpModal}>Sign Up</button>
              </div>
            ) }
          </div>
        </div>
        { this.props.preview ||
          <InsertToolbar
            addEditor={this.props.addEditor}
            addTextEditor={this.props.addTextEditor}
            addIframe={this.props.addIframe}
          />
        }
      </div>
    );
  }
}

MainToolbar.propTypes = {
  addEditor: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isFileDropdownOpen: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  togglePreviewMode: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
  unsavedChanges: PropTypes.bool.isRequired
};

export default MainToolbar;
