import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';

class P5Output extends React.Component {
  componentDidMount() {
    console.log("##########");

  }
  componentDidUpdate() {
    this.iframe.addEventListener('message', (messageEvent) => {
      console.log("---------");
      console.log(messageEvent.data);
    });
    // console.log("DID UPDATE");
    console.log('p5 editor Output');
    console.log(this.props.isPlaying);
    let defaultCode = `<!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.10/p5.min.js"></script>
      </head>
      <body>
        <script>`
        + this.props.editorCode
        +
      `</script>
      </body>
    </html>`;
    if(this.props.isPlaying) {
      console.log('p5 editor Output potato');
      this.iframe.contentWindow.document.open();
      this.iframe.contentWindow.document.write(defaultCode);
      this.iframe.contentWindow.document.close();
    }
  }

  render() {
    return (
      // <div>
      //   {(() => { // eslint-disable-line
      //     if (this.props.isPlaying) {
      //       return (
              <iframe ref={(element) => { this.iframe = element; }} id="code-output"></iframe>
      //       );
      //     }
      //   })()}
      // </div>
    );
  }
}

export default P5Output;
