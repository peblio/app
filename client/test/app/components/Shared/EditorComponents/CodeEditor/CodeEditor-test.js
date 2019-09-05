import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CodeMirror from 'codemirror';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/closeBrackets';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/mode/python/python';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/selection/active-line';

import { CodeEditor } from '../../../../../../src/app/components/App/Shared/EditorComponents/CodeEditor/CodeEditor';
import { updateFile } from '../../../../../../src/app/action/editors.js';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

const mockStore = configureMockStore([thunk]);
let wrapper;
let store;
let props;
configure({ adapter: new Adapter() });

describe('Shared component Documents', () => {
  beforeEach(() => {
    store = mockStore({
      preferences: {
        editorFontSize: '12',
        editorTheme: 'dark'
      }
    });
    props = {
      files: [
        {
          name: 'test.js',
          content:
          `function hello() {
            console.log('hi');
          }
          `
        }
      ],
      currentFile: 0,
      container: 'canvas',
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it.only('renders CodeEditor', () => {
    wrapper = shallow(<CodeEditor store={store} {...props} />);
    console.log(wrapper);
    const toolbarContainer = wrapper.find('.codeEditor__container');
    expect(toolbarContainer).to.have.lengthOf(1);

    // expect(wrapper.find(CodeEditor)).to.have.lengthOf(1);
  });
});
