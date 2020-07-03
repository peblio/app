import React from 'react';
import './modal.scss';

const Modal = ({
  modalWidth, 
  modalHeight, 
  modalClose,
  modalBodyStyle, 
  header, 
  children, 
  ...props,
}) => {
  return (
    <div className="modal">
      <div className="modal__overlay">
        <div className="modal__box" style={{width: modalWidth}}>
          <div className="modal__header">
            {header}
          </div>
          <div className="modal__body" style={modalBodyStyle}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
