import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Modal from '../../../../../../src/app/components/Modal/Modal';

describe('Generic Modal component', () => {
  it('Should render without errors', () => {
    const wrapper = shallow(
      <Modal header="Header" modalClose={() => {}}>
        Hello
      </Modal>
    );
    expect(wrapper.find('.modal')).to.have.lengthOf(1);
    expect(wrapper.find('.modal__overlay')).to.have.lengthOf(1);
    expect(wrapper.find('.modal__box')).to.have.lengthOf(1);

    const modalHeader = wrapper.find('.modal__header');
    expect(modalHeader).to.have.lengthOf(1);
    expect(modalHeader.text()).to.equal('Header');

    const modalBody = wrapper.find('.modal__body');
    expect(modalBody).to.have.lengthOf(1);
    expect(modalBody.text()).to.equal('Hello');
  });

  it('Should have additional classNames when modalClass prop is provided', () => {
    const wrapper = shallow(
      <Modal header="Header" modalClass="additional" modalClose={() => {}}>
        Hello
      </Modal>
    );
    expect(wrapper.find('.modal__box.additional')).to.have.lengthOf(1);
    expect(wrapper.find('.modal__header.additional__header')).to.have.lengthOf(1);
    expect(wrapper.find('.modal__body.additional__body')).to.have.lengthOf(1);
  });
});
