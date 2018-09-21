/* eslint-disable */

// This code is from https://github.com/processing/p5.js-web-editor/blob/master/client/utils/consoleUtils.js
const EXTERNAL_LINK_REGEX = /^(http:\/\/|https:\/\/)/;

var CONSOLEOUTPUT = CONSOLEOUTPUT || (function () {
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
        iframeWindow.console[method] = function () {
          // originalConsole[method].apply(originalConsole, arguments);

          let args = Array.from(arguments);
          args = args.map(i => ((typeof i === 'string') ? i : JSON.stringify(i)));

          const consoleEvent = {
            method,
            arguments: args,
            id: _args[0]
          };
          window.parent.postMessage(consoleEvent, '*');
        };
      });
    },

    callErrorConsole(errorLine, errorFile, displayLine) {
      iframeWindow.onerror = function (msg, url, lineNumber, columnNo, error) {
        const string = msg.toLowerCase();
        const substring = 'script error';
        const data = {};

        // 31 -> number of lines in hijackConsole
        msg = displayLine
          ? `${errorFile} : line ${lineNumber - errorLine + 31} - ${msg}`
          : `${errorFile} : ${msg}`;
        const consoleEvent = {
          method: 'error',
          arguments: [msg],
          id: _args[0]
        };
        window.parent.postMessage(consoleEvent, '*');
      };
    },
  };
}());
