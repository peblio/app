import React from 'react';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Tags from '../../../../../../src/app/components/App/Canvas/Tags/Tags.jsx';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

const mockStore = configureMockStore();
const store = mockStore({
  page: {
    id: 1,
    tags: ['java', 'java8']
  }
});
const addPageTagMock = sandbox.mock();
const deletePageTagMock = sandbox.mock();
const props = {
  container: 'canvas',
  preview: false,
  addPageTag: addPageTagMock,
  deletePageTag: deletePageTagMock
};
configure({ adapter: new Adapter() });

describe('Tags Component', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should render Tags component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Tags {...props} />
      </Provider>,
      {
        context: { store }
      }
    );

    expect(wrapper.find(Tags)).to.have.lengthOf(1);
    expect(wrapper.find('.tags__container')).to.have.lengthOf(1);
    expect(wrapper.find('.tags__container--canvas')).to.have.lengthOf(1);
  });

  it('should render Tags component with tag list', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Tags {...props} />
      </Provider>,
      {
        context: { store }
      }
    );

    expect(wrapper.find('.tags__list')).to.have.lengthOf(1);
    expect(wrapper.find('.tags__list').find('li')).to.have.lengthOf(2);
    expect(wrapper.find('.tags__list').find('.tags__list-item')).to.have.lengthOf(2);
  });

  it('should render every tag in tag list with text, link and button to delete tag', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Tags {...props} />
      </Provider>,
      {
        context: { store }
      }
    );

    const firstTag = wrapper.find('.tags__list').find('li').first();
    expect(firstTag.text()).to.equal('java');
    expect(firstTag.find('a')).to.have.lengthOf(1);
    expect(firstTag.find('.tags__name')).to.have.lengthOf(1);
    expect(firstTag.find('button')).to.have.lengthOf(1);
    expect(firstTag.find('.tags__delete-tag')).to.have.lengthOf(1);

    const secondTag = wrapper.find('.tags__list').find('li').last();
    expect(secondTag.text()).to.equal('java8');
    expect(secondTag.find('a')).to.have.lengthOf(1);
    expect(secondTag.find('.tags__name')).to.have.lengthOf(1);
    expect(secondTag.find('button')).to.have.lengthOf(1);
    expect(secondTag.find('.tags__delete-tag')).to.have.lengthOf(1);
    // TODO: Assert onClick
    // const deleteJavaTagFunction = () => deletePageTagMock("java");
    // expect(firstTag.find('.tags__delete-tag').props().onClick).to.deep.equal(deleteJavaTagFunction);
    // console.log("props ",firstTag.find('.tags__delete-tag').props().onClick)
  });
});
