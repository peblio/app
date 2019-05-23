import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserAccount from '../../../../../src/app/components/Shared/UserAccount/UserAccount.jsx';
import { fetchCurrentUser } from '../../../../../src/app/action/user.js';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

const mockStore = configureMockStore([thunk]);
let wrapper;
let store;
let props;
configure({ adapter: new Adapter() });

describe('UserAccount component when logged in as teacher', () => {
  beforeEach(() => {
    store = mockStore({
      mainToolbar: {
        isAccountDropdownOpen: true,
        isLoginModalOpen: false,
        isSignUpModalOpen: false
      },
      user: {
        name: 'teacher1',
        type: 'teacher'
      }
    });
    props = {
      container: 'profile',
      location: {
        pathname: ''
      }
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders 2 links, and account button', () => {
    wrapper = shallow(<UserAccount store={store} {...props} />).dive();
    expect(wrapper.find('.user-account__account-button')).to.have.lengthOf(1);
    expect(wrapper.find('.user-account__welcome')).to.have.lengthOf(1);
    expect(wrapper.find('.user-account__link')).to.have.lengthOf(2);
  });

  it('renders "Profile" when container is app', () => {
    props.container = 'app';
    wrapper = shallow(<UserAccount store={store} {...props} />).dive();
    expect(wrapper.find('.user-account__link').first().text()).to.equal('Profile');
  });

  it('renders "Workspace" when container is profile', () => {
    wrapper = shallow(<UserAccount store={store} {...props} />).dive();
    expect(wrapper.find('.user-account__link').first().text()).to.equal('Workspace');
  });
});

describe('UserAccount component when logged in as student', () => {
  beforeEach(() => {
    store = mockStore({
      mainToolbar: {
        isAccountDropdownOpen: true,
        isLoginModalOpen: false,
        isSignUpModalOpen: false
      },
      user: {
        name: 'student1',
        type: 'student'
      }
    });
    props = {
      container: 'profile',
      location: {
        pathname: ''
      }
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders 1 link, and account button', () => {
    wrapper = shallow(<UserAccount store={store} {...props} />).dive();
    expect(wrapper.find('.user-account__account-button')).to.have.lengthOf(1);
    expect(wrapper.find('.user-account__welcome')).to.have.lengthOf(1);
    expect(wrapper.find('.user-account__link')).to.have.lengthOf(1);
  });
});


describe('UserAccount component when not logged in', () => {
  beforeEach(() => {
    store = mockStore({
      mainToolbar: {
        isAccountDropdownOpen: true,
        isLoginModalOpen: false,
        isSignUpModalOpen: false
      },
      user: {
        name: '',
        type: ''
      }
    });
    props = {
      container: 'profile',
      location: {
        pathname: ''
      }
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders 1 link, and account button', () => {
    wrapper = shallow(<UserAccount store={store} {...props} />).dive();
    expect(wrapper.find('.user-account__button')).to.have.lengthOf(2);
    expect(wrapper.find('.user-account__button').first().text()).to.equal('Log In');
    expect(wrapper.find('.user-account__button').last().text()).to.equal('Sign Up');
  });
});
