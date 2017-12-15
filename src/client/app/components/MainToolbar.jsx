import React from 'react';
import TextToolbar from './TextToolbar.jsx';
import InsertToolbar from './InsertToolbar.jsx';

class MainToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.submitPage = this.submitPage.bind(this);
  }

  submitPage() {
    if (this.props.name) {
      if (this.props.id.length === 0) {
        this.props.submitPage(
          this.props.pageTitle,
          this.props.editors,
          this.props.indexEditor,
          this.props.textEditors,
          this.props.indexTextEditor,
          this.props.iframes,
          this.props.indexIframe
        );
      } else {
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
      }
    } else {
      this.props.viewLoginModal();
    }
  }

  render() {
    return (
      <div className="mainToolbar">
        <input
          className="mainToolbar__title"
          placeholder="Title"
          type="text" value={this.props.pageTitle} onChange={this.props.setPageTitle}
        ></input>
        <button className="mainToolbar_save" onClick={this.submitPage}>Save</button>
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

export default MainToolbar;
