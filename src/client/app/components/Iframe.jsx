import React, { PropTypes } from 'react';

class Iframe extends React.Component {
  constructor(props) {
    super(props);
  }
  onFocus() {
    // debugger;
    // this.props.setCurrentEditor(this.props.editorId);
  }
  urlSubmitted(event) {
    // debugger;
    this.props.setIframeURL(this.url.value);
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={(event) => {this.urlSubmitted(event)}}>
          <label> URL:
            <input type="text" ref={(element) => { this.url = element; }}  value={this.props.loginName}/>
          </label>
          <input type='submit' value='Submit'/>
        </form>
        <div>
          <iframe src={this.props.iframeURL}/>
        </div>
      </div>
    );
  }

}


export default Iframe;
