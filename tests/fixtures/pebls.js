import { EditorState, ContentState } from 'draft-js';

const TEST_WORKSPACE_LAYOUT = [
  {
    h: 3,
    i: 'editor-0',
    maxH: 100,
    maxW: 30,
    minH: 11,
    minW: 13,
    moved: false,
    static: false,
    w: 30,
    x: 0,
    y: 0,
  },
  {
    h: 30,
    i: 'editor-1',
    maxH: 100,
    maxW: 30,
    minH: 11,
    minW: 13,
    moved: false,
    static: false,
    w: 30,
    x: 0,
    y: 10
  }];

const testText1 = {
  type: 'text',
  id: 'editor-0',
  index: 0,
  editorState: EditorState.createWithContent(
    ContentState.createFromText('This is a test pebl')
  ),
  backColor: 'transparent'
};

const testText2 = {
  type: 'text',
  id: 'editor-1',
  index: 0,
  editorState: EditorState.createWithContent(
    ContentState.createFromText('This is still a test pebl')
  ),
  backColor: 'transparent'
};

export const testPebl = {
  // id:'abcd1234',
  title: 'test pebl',
  heading: 'test pebl heading',
  editors: {
    'editor-0': testText1,
    'editor-1': testText2,
  },
  editorIndex: 2,
  layout: TEST_WORKSPACE_LAYOUT
};
