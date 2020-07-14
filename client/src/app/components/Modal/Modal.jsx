import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

import { DEFAULT_MODAL_WIDTH } from '../../constants/modalConstants';

const Modal = ({
  modalWidth,
  modalClose,
  modalClass,
  header,
  children,
  ...props,
}) => (
  <div className="modal">
    <div className="modal__overlay">
      <div className={`modal__box ${modalClass || ''}`}>
        <div className={`modal__header ${modalClass ? `${modalClass}__header` : ''}`}>
          {header}
        </div>
        <div className={`modal__body ${modalClass ? `${modalClass}__body` : ''}`}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  modalWidth: PropTypes.string,
  modalClose: PropTypes.func.isRequired,
  modalClass: PropTypes.string,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  modalClass: '',
  modalWidth: DEFAULT_MODAL_WIDTH
};

export default Modal;
