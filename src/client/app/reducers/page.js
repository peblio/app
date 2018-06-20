import * as ActionTypes from '../constants.js';
import convertPixelHeightToGridHeight from '../utils/pixel-to-grid.js';

const initialState = {
  id: '',
  rgl: {
    cols: 30,
    margin: [50, 25],
    padding: [0, 0],
    rowHeight: 1,
    width: 1440,
  },
  layout: [],
  textHeights: {},
  pages: [],
  folders: [],
  pageTitle: 'Untitled',
  parentId: '',
  preview: false,
  unsavedChanges: false
};

const page = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.DELETE_PAGE:
      {
        const pages = state.pages.filter(id => id.id !== action.id);
        return Object.assign({}, state, {
          pages
        });
      }

    case ActionTypes.SET_PAGE_TITLE:
      return Object.assign({}, state, {
        pageTitle: action.event.target.value
      });

    case ActionTypes.SET_PAGE_LAYOUT:
      return Object.assign({}, state, {
        layout: action.value
      });

    case ActionTypes.SET_PAGE_ID:
      return Object.assign({}, state, {
        id: action.id
      });

    case ActionTypes.SET_DB_PAGE:
      return Object.assign({}, state, {
        id: action.id,
        pageTitle: action.title,
        preview: action.preview,
        layout: action.layout
      });

    case ActionTypes.SET_ALL_PAGES:
      return Object.assign({}, state, {
        pages: action.pages,
        folders: action.folders
      });

    case ActionTypes.SET_UNSAVED_CHANGES:
      return Object.assign({}, state, {
        unsavedChanges: action.value
      });

    case ActionTypes.TOGGLE_PREVIEW_MODE:
      return Object.assign({}, state, {
        preview: !state.preview
      });

    case ActionTypes.DUPLICATE_EDITOR: {
      const layout = state.layout;
      const originalEditorIndex = layout.findIndex(x => x.i === action.originalEditorId);
      const originalEditor = layout[originalEditorIndex];
      const duplicateEditor = { ...originalEditor };
      duplicateEditor.i = action.duplicateEditorId;
      // setting the duplicate's y to 1 less than the original's y + height
      // seems to place the duplicate directly below the original
      duplicateEditor.y = originalEditor.y + originalEditor.h + -1;
      layout.splice(originalEditorIndex, 0, duplicateEditor);
      return Object.assign({}, state, { layout });
    }

    case ActionTypes.RESIZE_TEXT_EDITOR: {
      const { margin, rowHeight } = state.rgl;
      const layout = JSON.parse(JSON.stringify(state.layout));
      const textHeights = state.textHeights;
      const gridItemIndex = layout.findIndex(x => x.i === action.id);
      // need to create copy of the grid item because ReactGridLayout tests
      // for object equality when deciding whether to re-render grid items
      // reference: https://github.com/STRML/react-grid-layout/issues/382#issuecomment-299734450
      const gridItem = JSON.parse(JSON.stringify(layout[gridItemIndex]));

      // convert from pixel height to grid units
      // reference: https://github.com/STRML/react-grid-layout/issues/190#issuecomment-200864419
      const h = convertPixelHeightToGridHeight(action.height, margin, rowHeight, gridItem.maxH);
      gridItem.h = h;
      textHeights[action.id] = h;

      layout[gridItemIndex] = gridItem;
      return Object.assign({}, state, { layout, textHeights });
    }

    case ActionTypes.UPDATE_TEXT_HEIGHT: {
      const { margin, rowHeight } = state.rgl;
      const gridItem = state.layout.find(x => x.i === action.id);
      const h = convertPixelHeightToGridHeight(action.height, margin, rowHeight, gridItem.maxH);
      const textHeights = {
        ...state.textHeights,
        [action.id]: h
      };
      return Object.assign({}, state, { textHeights });
    }

    case ActionTypes.CREATE_FOLDER: {
      return {
        ...state,
        folders: state.folders.concat(action.folder)
      };
    }

    default:
      return state;
  }
};

export default page;
