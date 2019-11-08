import React from 'react';
import { Elements, CardElement, injectStripe } from 'react-stripe-elements';
import { configure, shallow, mount } from 'enzyme';
import { assert } from 'sinon';
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
const stripe = {
  someKey: 'SomeData',
};
const makePayment = sandbox.stub();
configure({ adapter: new Adapter() });

describe('Dashboard with account view', () => {
  beforeEach(() => {
    store = mockStore({ stripe });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders CheckoutForm', () => {
    wrapper = shallow(<Elements><PureCheckoutForm store={store} makePayment={makePayment} stripe={stripe} /></Elements>).dive();

    expect(wrapper.find('.checkout-form__container')).to.have.lengthOf(1);
  });

  it('renders CheckoutForm with correct props', () => {
    const form = shallow(<Elements><PureCheckoutForm store={store} makePayment={makePayment} stripe={stripe} /></Elements>);

    expect(form.props().makePayment).to.equal(makePayment);
    expect(form.props().stripe).to.deep.equal({ someKey: 'SomeData' });
  });

  it('calls makePayment on Form submit of CheckoutForm', () => {
    wrapper = shallow(<Elements><PureCheckoutForm store={store} makePayment={makePayment} /></Elements>).dive();
    wrapper.find('button').simulate('click');

    assert.calledOnce(makePayment);
    assert.calledWith(makePayment, 'contribute10');
  });
});
