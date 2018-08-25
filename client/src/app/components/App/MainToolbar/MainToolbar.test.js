/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import merge from 'deepmerge';
import MainToolbar from './MainToolbar';

const noOp = () => {

};

const _MainToolbar = (override = {}) => {
  const props = merge({
    addCodeEditor: noOp,
    addTextEditor: noOp,
    addQuestionEditor: noOp,
    addIframe: noOp,
    addImage: noOp,
    canEdit: false,
    isFileDropdownOpen: false,
    isAccountDropdownOpen: false,
    name: 'name',
    pageTitle: 'title',
    preview: false,
    projectID: noOp,
    setPageTitle: noOp,
    savePage: noOp,
    toggleFileDropdown: noOp,
    toggleAccountDropdown: noOp,
    togglePreviewMode: noOp,
    unsavedChanges: false,
    viewExamplesModal: noOp,
    viewPagesModal: noOp,
    viewLoginModal: noOp,
    viewShareModal: noOp,
    viewSignUpModal: noOp
  }, override);

  return <MainToolbar {...props} />;
};

describe('MainToolbarSave', () => {
  it('should render save button if unsaved, with permission', () => {
    const mt = mount(
      _MainToolbar({
        canEdit: true,
        unsavedChanges: true
      })
    );
    expect(mt.find('.main-toolbar__save').text()).toEqual('Save');
  });

  it('should render fork button if unsaved, without permission', () => {
    const mt = mount(
      _MainToolbar({
        unsavedChanges: true
      })
    );
    expect(mt.find('.main-toolbar__save').text()).toEqual('Fork');
  });

  it('should render save button if new, not logged in', () => {
    const mt = mount(
      _MainToolbar({
        projectID: () => null,
        name: ''
      })
    );
    expect(mt.find('.main-toolbar__save').text()).toEqual('Save');
  });

  it('should render save button if new,logged in', () => {
    const mt = mount(
      _MainToolbar({
        projectID: () => null,
        name: 'name',
        canEdit: true
      })
    );
    expect(mt.find('.main-toolbar__save').text()).toEqual('Save');
  });
});
