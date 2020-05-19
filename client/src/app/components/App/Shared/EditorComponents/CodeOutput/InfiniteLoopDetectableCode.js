import React from 'react';
import { registerPlugin, transform as babelTransform } from 'babel-standalone';
import protect from 'loop-protect';

class InfiniteLoopDetectableCode extends React.Component {
  constructor(props) {
    super(props);
    this.stringCode = "for (i = 0; i > -1; i++) { console.log('Hey') }";
    this.errorCallback = (line) => {
      console.log(`Bad loop on line ${line}`);
    };
  }

  executeCode = () => {
    const timeout = 100; // defaults to 100ms
    registerPlugin('loopProtection', protect(timeout, this.errorCallback));
    const transformCode = source => babelTransform(source, {
      plugins: ['loopProtection'],
    }).code;

    // rewrite the user's JavaScript to protect loops
    const processed = transformCode(this.stringCode);

    // run in an iframe, and expose the loopProtect variable under a new name
    const iframe = document.createElement('iframe');
    // append the iframe to allow our code to run as soon as .close is called
    document.body.appendChild(iframe);

    console.log('iframe: ', iframe);
    // open the iframe and write the code to it
    const win = iframe.contentWindow;
    const doc = win.document;
    doc.open();
    doc.write(`<script>${processed}</script>`);
    doc.close();
  }

  render() {
    this.executeCode();
    return <div>I am a simple component</div>;
  }
}

export default InfiniteLoopDetectableCode;
