import React from 'react';
import TextToolbar from './TextToolbar.jsx';
import InsertToolbar from './InsertToolbar.jsx';

class MainToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input className="mainToolbar__title"
          placeholder="Title"
          type="text" value={this.props.pageTitle} onChange={this.props.setPageTitle}></input>
        <button onClick={() => {

          if(this.props.id.length==0){
            console.log('saving');
            this.props.submitPage(
              this.props.pageTitle,
              this.props.editors,
              this.props.indexEditor,
              this.props.textEditors,
              this.props.indexTextEditor
            );
          } else {
            console.log('updating');
            this.props.updatePage(
              this.props.id,
              this.props.pageTitle,
              this.props.editors,
              this.props.indexEditor,
              this.props.textEditors,
              this.props.indexTextEditor
            )
          }
        }}>SUBMIT</button>
        {(() => { // eslint-disable-line
          if (this.props.name) {
            return (
              <div>
                <p className="mainToolbar__login">
                  Welcome {this.props.name}
                </p>
                <button onClick={this.props.viewPagesModal}>
                  View all sketches
                </button>
                <a href="/logout">Logout</a>
              </div>
            );
          } else {
            return (
              <div>
                <button onClick={this.props.viewLoginModal}>Login</button>
                <button onClick={this.props.viewSignUpModal}>Sign Up</button>
              </div>
            );
          }
        })()}

        <InsertToolbar
          addEditor = {this.props.addEditor}
          addTextEditor = {this.props.addTextEditor}
          addIframe = {this.props.addIframe}
        />

      </div>
    );
  }
}

export default MainToolbar;
