import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Tags from '../../../../../src/app/components/App/Canvas/Tags/Tags.jsx';
const mockStore = configureMockStore();
const store = mockStore({
  page: {
    id: 1,
    tags: ["java", "java8"]
  }
});
let addPageTagMock = sandbox.mock();
let deletePageTagMock = sandbox.mock();
const props = {
  container: "canvas",
  preview: false,
  addPageTag: addPageTagMock,
  deletePageTag: deletePageTagMock
};
configure({ adapter: new Adapter() });

describe('Canvas Component', () => {

  afterEach(() => {
    sandbox.restore();
  });

  it('should render without throwing an error', () => {
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
});
