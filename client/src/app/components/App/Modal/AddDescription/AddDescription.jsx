import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tags from '../../Canvas/Tags/Tags.jsx';
import {
  setPageHeading,
  setPageDescription
} from '../../../../action/page.js';

require('./addDescription.scss');

class AddDescription extends React.Component {
  render() {
    return (
      <div className="description-modal__content">
        <h1 className="description-modal__title">
        Pebl description
        </h1>
        <input
          type="text"
          className='description-modal__input'
          placeholder="title.."
          value={this.props.pageHeading}
          onChange={this.props.setPageHeading}
        />
        <input
          type="text"
          className='description-modal__input'
          placeholder="description.."
          value={this.props.description}
          onChange={this.props.setPageDescription}
        />
        <Tags
          preview={false}
        />
        <button
          className="description-modal__button"
          onClick={() => {
            this.props.savePage();
            this.props.closeModal();
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

AddDescription.propTypes = {
  closeModal: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  pageHeading: PropTypes.string.isRequired,
  savePage: PropTypes.func.isRequired,
  setPageHeading: PropTypes.func.isRequired,
  setPageDescription: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    pageHeading: state.page.pageHeading,
    description: state.page.description
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setPageDescription,
  setPageHeading
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddDescription);
