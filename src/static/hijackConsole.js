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
          args = args.map(i =>
                // catch objects
                 (typeof i === 'string') ? i : JSON.stringify(i));

          const consoleEvent = {
            method,
            arguments: args,
            test: _args[0]
          };
          window.parent.postMessage(consoleEvent, '*');
        };
      });
    }
  };
}());
