import React, { PropTypes } from 'react';

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.copyShareLink = this.copyShareLink.bind(this);
  }

  copyShareLink() {
    this.input.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log(`Copying text command was ${msg}`);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="share__container">
        <input className="share__input" ref={(element) => { this.input = element; }} value={window.location.href} readOnly></input>
        <button className="share__button" onClick={this.copyShareLink}>Copy Link</button>
      </div>
    );
  }
}

export default Share;
