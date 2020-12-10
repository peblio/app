import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../Modal/Modal';
import Button from '../../../Button/Button';

import history from '../../../../utils/history';

import './learnMoreModal.scss';

// eslint-disable-next-line no-shadow
const LearnMoreModal = ({ closeLearnMoreModal }) => (
  <Modal
    header='Peblio Classroom'
    modalClass='account-upgrade-modal'
  >
    <React.Fragment>
      <h5 className="account-upgrade-modal__body__header">
        Upgrade to a Peblio teacher account for access to our classroom tools!
      </h5>
      <iframe title="intro" width="560" height="315" src="https://www.youtube.com/embed/8j0UDiN7my4" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="account-upgrade-modal__body__button-area">
        <Button onClick={closeLearnMoreModal} style={{ marginRight: '25px' }} className="secondary">Cancel</Button>
        <Button onClick={() => { closeLearnMoreModal(); history.push('/pricing'); }} className="primary">Upgrade</Button>
      </div>
    </React.Fragment>
  </Modal>
);

LearnMoreModal.propTypes = {
  closeLearnMoreModal: PropTypes.func.isRequired
};

export default LearnMoreModal;
