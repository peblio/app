import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';

import history from '../../../utils/history';

import './downgradeModal.scss';

// eslint-disable-next-line no-shadow
const DowngradeModal = ({ closeDowngradeModal }) => (
  <Modal
    header='Downgrade Plan'
    modalClass='downgrade-modal'
  >
    <React.Fragment>
      <h5 className="downgrade-modal__body__header">
        Are you sure you want to downgrade?
      </h5>
      <div className="downgrade-modal__body__confirmation-text">
        If you downgrade your plan, all created classes will be permanently lost. This action cannot be undone.
      </div>
      <div className="downgrade-modal__body__resource-info">
        Your assignments in resources can be found in your documents folder.
      </div>
      <div className="downgrade-modal__body__button-area">
        <Button onClick={closeDowngradeModal} style={{ marginRight: '25px' }} className="secondary">Cancel</Button>
        <Button onClick={closeDowngradeModal} className="primary">
          <a href="mailto:info@peblio.co?subject=Please downgrade my peblio plan">Downgrade</a>
        </Button>
      </div>
    </React.Fragment>
  </Modal>
);

DowngradeModal.propTypes = {
  closeDowngradeModal: PropTypes.func.isRequired
};

export default DowngradeModal;
