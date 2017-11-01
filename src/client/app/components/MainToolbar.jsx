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
        <input type="text" value={this.props.pageTitle} onChange={this.props.setPageTitle}></input>
        <button onClick={() => {
            this.props.submitPage(this.props.pageTitle, this.props.editors, this.props.indexEditor);
          }}>SUBMIT</button>
        <InsertToolbar
          addEditor = {this.props.addEditor}
          addTextEditor = {this.props.addTextEditor}
        />
      </div>
    );
  }
}

export default MainToolbar;
