import React from 'react';
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

export default Modal;
