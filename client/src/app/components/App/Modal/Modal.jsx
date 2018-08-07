import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

class Modal extends React.Component {
  static defaultProps = {
    style: {
      content: {},
      overlay: {}
    }
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  render() {
    return (
      <ReactModal
        className={`modal__${this.props.size}`}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        style={this.props.style}
      >
        <nav>
          <button className="modal__close-button" onClick={this.props.closeModal} data-test="close-modal">╳</button>
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
  isOpen: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
  style: PropTypes.shape({
    content: PropTypes.shape({}),
    overlay: PropTypes.shape({})
  })
};

export default Modal;
