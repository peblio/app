import { normalize } from 'normalizr';

import * as ActionTypes from '../constants/reduxConstants.js';
import { folderSchema, pageSchema } from '../schema.js';

export const initialState = {
  pages: {
    byId: {},
    allIds: [] // keeps track of display order
  },
  filteredPages: {
    byId: {},
    allIds: [] // keeps track of display order
  },
  folders: {
    byId: {},
    allIds: []
  },
  selectedFolderIds: [],
  selectedPageId: null,
  searchText: null,
  isSearchByTitle: false
};

function findChildFolderIds(foldersById = {}, folderId = '') {
  const folder = foldersById[folderId];
  if (!folder) {
    return [];
  }
  return [folderId, ...(folder.children || []).reduce((accum, childId) => [
    ...accum,
    ...findChildFolderIds(foldersById, childId)
  ], [])];
}

const foldersReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_PAGE: {
      const { pages, selectedPageId } = state;
      delete pages.byId[action.pageId];
      return {
        ...state,
        pages: {
          byId: { ...pages.byId },
          allIds: pages.allIds.filter(pageId => pageId !== action.pageId)
        },
        selectedPageId: selectedPageId !== action.pageId ? selectedPageId : null
      };
    }

    case ActionTypes.SET_ALL_PAGES: {
      const normalizedPageData = normalize(action.pages, [pageSchema]);
      const normalizedFolderData = normalize(action.folders, [folderSchema]);
      return Object.assign({}, state, {
        pages: {
          byId: {
            ...(normalizedPageData.entities.pages || {}),
            ...(normalizedFolderData.entities.pages || {})
          },
          allIds: (normalizedPageData.result || [])
            .concat(Object.keys(normalizedFolderData.entities.pages || {}))
            .filter((elem, pos, arr) => arr.indexOf(elem) === pos) // filter uniques
        },
        folders: {
          byId: (normalizedFolderData.entities.folders || {}),
          allIds: (normalizedFolderData.result || [])
        }
      });
    }

    case ActionTypes.SEARCH_BY_TITLE: {
      return Object.assign({}, state, {
        searchText: action.searchText,
        isSearchByTitle: true,
        filteredPages: {
          byId: Object.values(state.pages.byId)
            .filter(page => page.title && page.title.includes(action.searchText))
        }
      });
    }

    case ActionTypes.CLEAR_SEARCH_BY_TITLE: {
      return Object.assign({}, state, {
        searchText: null,
        isSearchByTitle: false,
        filteredPages: {
          byId: {},
          allIds: []
        }
      });
    }

    case ActionTypes.CREATE_FOLDER: {
      const { folders } = state;
      const normalizedFolderData = normalize(action.folder, folderSchema);
      const parentFolderById = {};
      const parentFolderId = action.folder.parent;
      if (parentFolderId) {
        const parentFolder = folders.byId[parentFolderId];
        parentFolder.children = (parentFolder.children || []).concat(action.folder._id);
        parentFolderById[parentFolderId] = parentFolder;
      }
      return {
        ...state,
        folders: {
          ...folders,
          byId: {
            ...folders.byId,
            ...(normalizedFolderData.entities.folders || {}),
            ...parentFolderById
          },
          allIds: folders.allIds.concat(normalizedFolderData.result || [])
        }
      };
    }

    case ActionTypes.DELETE_FOLDER: {
      const { folders, pages, selectedFolderIds } = state;
      const folderIdsToDelete = findChildFolderIds(folders.byId, action.folderId);
      const pageIdsToDelete = pages.allIds.filter(pageId => folderIdsToDelete.includes(pages.byId[pageId].folder));
      return {
        ...state,
        folders: {
          byId: Object.values(folders.byId).reduce((accum, folder) => {
            if (folderIdsToDelete.includes(folder._id)) {
              return accum;
            }
            return { ...accum, [folder._id]: folder };
          }, {}),
          allIds: folders.allIds.filter(folderId => !folderIdsToDelete.includes(folderId))
        },
        pages: {
          byId: Object.values(pages.byId).reduce((accum, p) => {
            if (pageIdsToDelete.includes(p._id)) {
              return accum;
            }
            return { ...accum, [p._id]: p };
          }, {}),
          allIds: pages.allIds.filter(pageId => !pageIdsToDelete.includes(pageId))
        },
        selectedFolderIds: selectedFolderIds.filter(selectedFolderId => !folderIdsToDelete.includes(selectedFolderId))
      };
    }

    case ActionTypes.RENAME_FOLDER: {
      const { folders } = state;
      folders.byId[action.folderId].title = action.folderName;
      return {
        ...state,
        folders: {
          ...folders
        }
      };
    }

    case ActionTypes.MOVE_PAGE_TO_TOP_LEVEL: {
      const pageId = action.pageId;
      const { folders, pages } = state;
      const pageToMove = pages.byId[pageId];
      const folderId = pageToMove.folder;
      if (!folderId) {
        return state;
      }
      const folder = folders.byId[folderId];
      folder.files = folder.files.filter(pId => pId !== pageId);

      delete pageToMove.folder;

      return {
        ...state,
        folders: {
          ...folders,
          byId: {
            ...folders.byId,
            [folderId]: { ...folder }
          }
        },
        pages: {
          ...pages,
          byId: {
            ...pages.byId,
            [pageId]: { ...pageToMove }
          }
        }
      };
    }

    case ActionTypes.MOVE_PAGE_TO_FOLDER: {
      const { folderId, pageId } = action;
      const { folders, pages } = state;

      const pageToMove = pages.byId[pageId];

      const prevFolderById = {};
      if (pageToMove.folder) {
        const prevFolder = folders.byId[pageToMove.folder];
        prevFolder.files = (prevFolder.files || []).filter(pId => pId !== pageId);
        prevFolderById[pageToMove.folder] = { ...prevFolder };
      }

      pageToMove.folder = folderId;

      const folder = folders.byId[folderId];
      folder.files = (folder.files || []).concat(pageId);
      return {
        ...state,
        folders: {
          ...folders,
          byId: {
            ...folders.byId,
            ...prevFolderById,
            [folderId]: { ...folder }
          }
        },
        pages: {
          ...pages,
          byId: {
            ...pages.byId,
            [pageId]: { ...pageToMove }
          }
        }
      };
    }

    case ActionTypes.MOVE_FOLDER_TO_TOP_LEVEL: {
      const childFolderId = action.folderId;
      const { folders } = state;
      const childFolder = folders.byId[childFolderId];
      const parentFolderId = childFolder.parent;
      if (!parentFolderId) {
        return state;
      }

      const parentFolder = folders.byId[parentFolderId];
      parentFolder.children = (parentFolder.children || []).filter(folderId => folderId !== childFolderId);

      delete childFolder.parent;
      return {
        ...state,
        folders: {
          ...folders,
          byId: {
            ...folders.byId,
            [childFolderId]: { ...childFolder },
            [parentFolderId]: { ...parentFolder }
          }
        }
      };
    }

    case ActionTypes.MOVE_FOLDER_TO_FOLDER: {
      const { childFolderId, parentFolderId } = action;
      const { folders } = state;

      const childFolder = folders.byId[childFolderId];

      const prevParentFolderById = {};
      if (childFolder.parent) {
        const prevParentFolder = folders.byId[childFolder.parent];
        prevParentFolder.children = (prevParentFolder.children || []).filter(folderId => folderId !== childFolderId);
        prevParentFolderById[childFolder.parent] = { ...prevParentFolder };
      }

      childFolder.parent = parentFolderId;

      const parentFolder = folders.byId[parentFolderId];
      parentFolder.children = (parentFolder.children || []).concat(childFolderId);
      return {
        ...state,
        folders: {
          ...folders,
          byId: {
            ...folders.byId,
            ...prevParentFolderById,
            [childFolderId]: { ...childFolder },
            [parentFolderId]: { ...parentFolder }
          }
        },
      };
    }

    case ActionTypes.CREATE_PAGE: {
      const { pages } = state;
      const normalizedPageData = normalize(action.page, pageSchema);
      return {
        ...state,
        pages: {
          byId: {
            ...pages.byId,
            ...(normalizedPageData.entities.pages || {}),
          },
          allIds: pages.allIds.concat(normalizedPageData.result || [])
        }
      };
    }

    case ActionTypes.VIEW_FOLDER: {
      const { folderId, depth } = action;
      const { selectedFolderIds } = state;
      selectedFolderIds.splice(depth, selectedFolderIds.length - depth, folderId);
      return {
        ...state,
        selectedFolderIds: [...selectedFolderIds]
      };
    }

    case ActionTypes.VIEW_PAGE: {
      return {
        ...state,
        selectedPageId: action.pageId
      };
    }

    case ActionTypes.JUMP_TO_FOLDER: {
      const { folderShortId } = action;
      const { folders } = state;
      const folder = Object.values(folders.byId).find(f => f.shortId === folderShortId);
      if (!folder) {
        return state;
      }
      const selectedFolderIds = [folder._id];
      let currentFolder = folder;
      while (currentFolder && currentFolder.parent && currentFolder._id !== currentFolder.parent) {
        selectedFolderIds.unshift(currentFolder.parent);
        currentFolder = folders.byId[currentFolder.parent];
      }
      return {
        ...state,
        selectedFolderIds: [...selectedFolderIds]
      };
    }

    case ActionTypes.CLEAR_SELECTED_FOLDERS: {
      const { depth } = action;
      if (!depth) {
        return {
          ...state,
          selectedFolderIds: [],
          selectedPageId: null
        };
      }

      const { selectedFolderIds } = state;
      selectedFolderIds.splice(depth, selectedFolderIds.length - depth);
      return {
        ...state,
        selectedFolderIds: [...selectedFolderIds],
        selectedPageId: null
      };
    }

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default foldersReducer;
