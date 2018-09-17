function outf(text) {
  const mypre = document.getElementById('python-output');
  mypre.innerHTML += text;
}

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) throw `File not found: '${x}'`;
  return Sk.builtinFiles.files[x];
}

function inputf(prompt) {
  return window.prompt(prompt);
}

function executeCode(pythonCode) {
  Sk.pre = 'python-output';
  Sk.configure({
    inputfun(prompt) {
      return window.prompt(prompt);
    },
    inputfunTakesPrompt: true,
    output: outf,
    read: builtinRead });
  if (!Sk.TurtleGraphics) {
    Sk.TurtleGraphics = {};
    Sk.TurtleGraphics.target = 'python-graphic-output';
  }
  const myPromise = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, pythonCode, true));
  myPromise.then((mod) => {
  },
  (err) => {

  });
}
window.onload = executeCode;
