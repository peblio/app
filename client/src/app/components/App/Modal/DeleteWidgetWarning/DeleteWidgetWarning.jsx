import React from 'react';
import PropTypes from 'prop-types';

require('./deleteWidgetWarning.scss');

export default class DeleteWidgetWarning extends React.Component {
  deleteWidgetConfirm = () => {
    this.props.deleteWidget();
    this.props.closeModal();
  }

  render() {
    return (
      <div className="deleteWidgetWarning-modal__content">
        <h1 className="deleteWidgetWarning-modal__sub-title">
          <div>
            <div className="deleteWidgetWarning-modal__sub-title">
        Are you sure you want to delete the widget?
            </div>
            <div className="deleteWidgetWarning-modal__footnote">
        This would delete the widget from your page permanently
            </div>
          </div>
        </h1>
        <button
          className="deleteWidgetWarning-modal__button"
          data-test="widget__confirm"
          onClick={this.deleteWidgetConfirm}
        >
          Delete
        </button>
        <button
          className="deleteWidgetWarning-modal__button"
          data-test="widget__cancel"
          onClick={this.props.closeModal}
        >
          Cancel
        </button>
      </div>
    );
  }
}

DeleteWidgetWarning.propTypes = {
  deleteWidget: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};
