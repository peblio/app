import React, { PropTypes } from 'react';

class Share extends React.Component {
  render() {
    return (
      <div className="share__container">
        <input className="share__input"></input>
        <button className="share__button">Copy Link</button>
      </div>
    );
  }
}

export default Share;
