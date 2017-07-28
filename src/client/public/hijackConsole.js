var iframeWindow = window;
var originalConsole = iframeWindow.console;
iframeWindow.console = {};

var methods = [
  'debug', 'clear', 'error', 'info', 'log', 'warn'
];

var LOGWAIT = 1000;

methods.forEach( function(method) {
  iframeWindow.console[method] = function() {
    originalConsole[method].apply(originalConsole, arguments);

    var args = Array.from(arguments);
    args = args.map(function(i) {
      // catch objects
      return (typeof i === 'string') ? i : JSON.stringify(i);
    });

    var consoleEvent = {
      method: method,
      arguments: args
    };
    window.parent.postMessage(consoleEvent, '*');
  };
});


  // if (consoleBuffer.length > 0) {
  //   window.parent.postMessage(consoleBuffer, '*');
  //   consoleBuffer.length = 0;
  //
  // }
