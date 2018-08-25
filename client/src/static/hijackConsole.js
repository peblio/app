// This code is from https://github.com/processing/p5.js-web-editor/blob/master/client/utils/consoleUtils.js
const EXTERNAL_LINK_REGEX = /^(http:\/\/|https:\/\/)/;

const CONSOLEOUTPUT = CONSOLEOUTPUT || (() => {
  let _args = {}; // private

  const iframeWindow = window;
  const originalConsole = iframeWindow.console;
  iframeWindow.console = {};

  const methods = [
    'debug', 'clear', 'error', 'info', 'log', 'warn'
  ];

  return {
    init(Args) {
      _args = Args;
      // some other initialising
    },
    callConsole() {
      methods.forEach((method) => {
        iframeWindow.console[method] = () => {
          // originalConsole[method].apply(originalConsole, arguments);

          let args = Array.from(arguments);

          // catch objects
          args = args.map(i => typeof i === 'string' ? i : JSON.stringify(i));

          const consoleEvent = {
            method,
            arguments: args,
            id: _args[0]
          };
          window.parent.postMessage(consoleEvent, '*');
        };
      });
    },

    callErrorConsole(errorLine, errorFile) {
      iframeWindow.onerror = (msg, url, lineNumber, columnNo, error) => {
        const errorTitle = 'script error';
        const errorDescription = msg.toLowerCase();
        const data = {};

        console.log(errorTitle, errorDescription);

        // 31 -> number of lines in hijackConsole
        const errorMessage = `${errorFile} : line ${lineNumber - (errorLine + 31)} - ${msg}`;
        const consoleEvent = {
          method: 'error',
          arguments: [errorMessage],
          id: _args[0]
        };
        window.parent.postMessage(consoleEvent, '*');
      };
    },


  };
})();
