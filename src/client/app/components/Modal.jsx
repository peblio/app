import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

class Modal extends React.Component {
  componentWillMount() {
    ReactModal.setAppElement('body');
  }

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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default Modal;
