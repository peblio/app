import React, { PropTypes } from 'react';
import InsertToolbar from './InsertToolbar.jsx';

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
    let saveText = 'Save';
    if (!this.props.name) {
      saveText = 'Login and Save';
    } else if (!this.props.canEdit && this.props.id) {
      saveText = 'Fork and Save';
    }
    return (
      <div className="mainToolbar">
        <input
          className="mainToolbar__title"
          placeholder="Title"
          type="text" value={this.props.pageTitle} onChange={this.props.setPageTitle}
        ></input>
        <button className="mainToolbar_save" onClick={this.savePage}>{saveText}</button>
        {(()=> { // eslint-disable-line
          if (this.props.name) {
            return (
              <div className="mainToolbar_div">
                <p className="mainToolbar__welcome">
                    Welcome {this.props.name}!
                </p>
                <button className="mainToolbar__open" onClick={this.props.viewPagesModal}>
                  View all sketches
                </button>
                <a className="mainToolbar_save" href="/logout">Logout</a>
              </div>

            );
          }
          return (
            <div className="mainToolbar_div">
              <button className="mainToolbar_save" onClick={this.props.viewLoginModal}>Log In</button>
              <button className="mainToolbar_save" onClick={this.props.viewSignUpModal}>Sign Up</button>
            </div>
          );
        })()}
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
  pageTitle: PropTypes.string.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  submitPage: PropTypes.func.isRequired,
  textEditors: PropTypes.shape.isRequired,
  updatePage: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired
};

export default MainToolbar;
