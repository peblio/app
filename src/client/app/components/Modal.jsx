import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';

class Modal extends React.Component {

  render() {
    const modalClassName = `modal__${this.props.size}`;
    return (
      <ReactModal className={modalClassName} isOpen={this.props.isOpen}>
        <nav>
          <button className="modal__closeButton" onClick={this.props.closeModal}>Close</button>
        </nav>
        {this.props.children}
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.shape.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default Modal;
