import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = ({
  modalWidth,
  modalHeight,
  modalClose,
  modalClass,
  modalBodyStyle,
  header,
  children,
  ...props,
}) => (
  <div className="modal">
    <div className="modal__overlay">
      <div className={`modal__box ${modalClass || ''}`} style={{ width: modalWidth }}>
        <div className={`modal__header ${modalClass ? `${modalClass}__header` : ''}`}>
          {header}
        </div>
        <div className={`modal__body ${modalClass ? `${modalClass}__body` : ''}`} style={modalBodyStyle}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  modalWidth: PropTypes.string.isRequired,
  modalHeight: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
  modalClass: PropTypes.string,
  modalBodyStyle: PropTypes.shape({}).isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  modalClass: ''
};

export default Modal;
