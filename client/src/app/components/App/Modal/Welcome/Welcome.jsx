import React, { Component } from 'react';

require('./welcome.scss');

class Welcome extends Component {
  render() {
    return (
      <section className="welcome__container">
        <h1 className="welcome__title">Welcome to Peblio</h1>
        <h2 className="welcome__subtitle">
          Peblio is a tool for creating interactive computer science worksheets.
          See how it works in the demo below.
        </h2>
        <div className="welcome__iframe-container">
          <iframe
            title="welcome to peblio"
            className="welcome__iframe"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/wq3CL8LFN-Y"
            frameBorder="0"
            allowFullScreen
          >
          </iframe>
        </div>
      </section>
    );
  }
}


export default Welcome;
