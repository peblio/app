import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Canvas from '../../../../../src/app/components/App/Canvas/Canvas.jsx';
import Heading from '../../../../../src/app/components/App/Canvas/Heading/Heading.jsx';


const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });


describe('Canvas Component', () => {
  it('should render without throwing an error', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Canvas />
      </Provider>
    );
    expect(wrapper.find(Heading)).to.have.lengthOf(1);
  });
});
//
// describe('Canvas component testing', function() {
//   it('renders Canvas message', function() {
//     const wrapper = shallow(<Canvas />);
//
//     console.log("wrapper", wrapper);
//     expect(wrapper.contains(welcome)).to.equal(true);
//   });
// });
