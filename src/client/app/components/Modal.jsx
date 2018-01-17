import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

class Modal extends React.Component {
  render() {
    return (
      <ReactModal className="Modal" isOpen={this.props.isOpen}>
        <nav>
          <button className="Modal_closeButton" onClick={this.props.closeModal}>Close</button>
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
