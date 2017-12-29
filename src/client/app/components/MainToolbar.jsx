import React, { PropTypes } from 'react';
import FileModal from './FileModal.jsx';
import InsertToolbar from './InsertToolbar.jsx';
import ToolbarLogo from '../images/logo.svg';
import EditorSVG from '../images/editor.svg';

class MainToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.savePage = this.savePage.bind(this);
  }

  savePage() {
    if (this.props.name) {
      if (this.props.id.length === 0) {
        this.props.submitPage(
          '',
          this.props.pageTitle,
          this.props.editors,
          this.props.indexEditor,
          this.props.textEditors,
          this.props.indexTextEditor,
          this.props.iframes,
          this.props.indexIframe
        );
      } else if (this.props.canEdit) {
        this.props.updatePage(
          this.props.id,
          this.props.pageTitle,
          this.props.editors,
          this.props.indexEditor,
          this.props.textEditors,
          this.props.indexTextEditor,
          this.props.iframes,
          this.props.indexIframe
        );
      } else {
        // this is for fork and save
        this.props.submitPage(
          this.props.id,
          `${this.props.pageTitle}-copy`,
          this.props.editors,
          this.props.indexEditor,
          this.props.textEditors,
          this.props.indexTextEditor,
          this.props.iframes,
          this.props.indexIframe
        );
      }
    } else {
      this.props.viewLoginModal();
    }
  }

  render() {
    return (
      <div>
        <div className="mainToolbar">
          <div className="mainToolbar__div-left">
            <div className="logo_toolbar">
              <ToolbarLogo alt="logo in toolbar"/>
            </div>

            <div className="fileModal__container">
              <button className="upperToolbar__dropdown" onClick={this.props.toggleFileDropdown}>
              File
              </button>
            {(() => { // eslint-disable-line
              if (this.props.isFileDropdownOpen) {
                return (
                  <FileModal
                    name={this.props.name}
                    savePage={this.savePage}
                    viewPagesModal={this.props.viewPagesModal}
                  />
                );
              }
            })()}
            </div>
          </div>
          <input
            className="mainToolbar__title"
            placeholder="Title"
            type="text" value={this.props.pageTitle} onChange={this.props.setPageTitle}
          ></input>
          <div className="mainToolbar__div-right">
        {(()=> { // eslint-disable-line
          if (this.props.name) {
            return (
              <div>


                <a className="mainToolbar__save" href="/logout">Logout</a>
                  <p className="mainToolbar__welcome">
                      Welcome {this.props.name}!
                  </p>
              </div>

            );
          }
          return (
            <div>
              <button className="mainToolbar__save" onClick={this.props.viewLoginModal}>Log In</button>
              <button className="mainToolbar__save" onClick={this.props.viewSignUpModal}>Sign Up</button>
            </div>
          );
        })()}
          </div>
        </div>

        <InsertToolbar
          addEditor={this.props.addEditor}
          addTextEditor={this.props.addTextEditor}
          addIframe={this.props.addIframe}
        />
      </div>
    );
  }
}

MainToolbar.propTypes = {
  addEditor: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  editors: PropTypes.shape.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  iframes: PropTypes.shape.isRequired,
  indexEditor: PropTypes.number.isRequired,
  indexIframe: PropTypes.number.isRequired,
  indexTextEditor: PropTypes.number.isRequired,
  isFileDropdownOpen: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  submitPage: PropTypes.func.isRequired,
  textEditors: PropTypes.shape.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired
};

export default MainToolbar;
