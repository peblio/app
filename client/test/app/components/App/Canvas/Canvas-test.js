import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Canvas from '../../../../../src/app/components/App/Canvas/Canvas.jsx';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });


describe('Canvas component testing', function() {
  it('renders Canvas message', function() {
    const wrapper = shallow(<Canvas />); 

    console.log("wrapper", wrapper);
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});