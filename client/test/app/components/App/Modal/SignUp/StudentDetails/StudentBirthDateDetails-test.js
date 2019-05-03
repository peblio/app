import React from 'react';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import moment from 'moment';
import StudentBirthDateDetails from '../../../../../../../src/app/components/App/Modal/SignUp/StudentDetails/StudentBirthDateDetails.jsx';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const sinon = require('sinon');

const sandbox = sinon.sandbox.create();
const mockStore = configureMockStore();
configure({ adapter: new Adapter() });

describe('StudentBirthDateDetails Component', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should render StudentBirthDateDetails component', () => {
    const store = mockStore({
      user: {}
    });
    const wrapper = mount(
      <Provider store={store}>
        <StudentBirthDateDetails />
      </Provider>,
      { context: { store } }
    );

    expect(wrapper.find(StudentBirthDateDetails)).to.have.lengthOf(1);
    expect(wrapper.find('.signup-modal__birthday')).to.have.lengthOf(1);
    expect(wrapper.find('.signup-modal__input-text')).to.have.lengthOf(1);
  });

  it('should render StudentBirthDateDetails component with Month Dropdown', () => {
    const store = mockStore({
      user: {}
    });
    const wrapper = mount(
      <Provider store={store}>
        <StudentBirthDateDetails />
      </Provider>,
      { context: { store } }
    );

    expect(wrapper.find('.signup-modal__dropdown')).to.have.lengthOf(2);
    expect(wrapper.find('.signup-modal__dropdown').first().find('option')).to.have.lengthOf(12);
    const monthOptions = wrapper.find('.signup-modal__dropdown').first().find('option');
    expect(monthOptions).to.have.lengthOf(12);
    monthOptions.forEach((month, index) => {
      expect(month.text()).to.equal(months[index]);
      expect(month.props().value).to.equal(index);
    });
  });

  it('should render StudentBirthDateDetails component with Year Dropdown', () => {
    let currentYear = moment().year();
    const store = mockStore({
      user: {}
    });
    const wrapper = mount(
      <Provider store={store}>
        <StudentBirthDateDetails />
      </Provider>,
      { context: { store } }
    );

    expect(wrapper.find('.signup-modal__dropdown')).to.have.lengthOf(2);
    expect(wrapper.find('.signup-modal__dropdown').first().find('option')).to.have.lengthOf(12);
    const yearOptions = wrapper.find('.signup-modal__dropdown').last().find('option');
    expect(yearOptions).to.have.lengthOf(100);
    yearOptions.forEach((year, index) => {
      const expectedYear = `${currentYear}`;
      expect(year.text()).to.equal(expectedYear);
      expect(year.props().value).to.equal(parseInt(expectedYear));
      currentYear -= 1;
    });
  });
});
