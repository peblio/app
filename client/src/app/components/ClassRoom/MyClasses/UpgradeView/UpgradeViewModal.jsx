import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../Button/Button';

import './upgradeViewModal.scss';

const UpgradeViewModal = props => (
  <div className="upgrade-view-modal">
    <div className="upgrade-view-modal__container">
      <h1 className="upgrade-view-modal__header">
        Peblio Classroom
      </h1>
      <h2 className="upgrade-view-modal__sub-header">
        Upgrade to a Peblio teacher account for access to our classroom tools!
      </h2>
      <iframe
        width="100%"
        height="290"
        src="https://www.youtube.com/embed/amt6Q_F9TYg"
        frameBorder="0"
        title="Intro to classrooms"
        allow="accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture"
        allowFullScreen
      >
      </iframe>

      <Button
        className="primary"
        onClick={props.upgrade}
        style={{
          padding: '8px 48px'
        }}
      >
        Upgrade
      </Button>
    </div>
  </div>
);

UpgradeViewModal.propTypes = {
  upgrade: PropTypes.func.isRequired
};

export default UpgradeViewModal;
