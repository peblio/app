import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tags from '../../Canvas/Tags/Tags.jsx';
import { setPageDescription } from '../../../../action/page.js';

import axios from '../../../../utils/axios';
import history from '../../../../utils/history';

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
          value={this.props.heading}
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
            // this.props.closeModal();
            console.log(this.props.description);
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

AddDescription.propTypes = {

};

function mapStateToProps(state) {
  return {
    description: state.page.description,
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setPageDescription,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddDescription);
