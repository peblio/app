import React from 'react';
import { Elements, CardElement, injectStripe } from 'react-stripe-elements';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PaymentPage from '../../../../src/app/components/Payment/PaymentPage.jsx';
import { PureCheckoutForm } from '../../../../src/app/components/Payment/CheckoutForm.jsx';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

const mockStore = configureMockStore([thunk]);
let wrapper;
let store;
let props;
configure({ adapter: new Adapter() });

describe('Dashboard with account view', () => {
  beforeEach(() => {
    store = mockStore({
      user: {
        name: 'Dolan',
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders CheckoutForm', () => {
    wrapper = shallow(<Elements>
      <PureCheckoutForm store={store} />
    </Elements>).dive();
    expect(wrapper.find('.checkout-form__container')).to.have.lengthOf(1);
  });
});
