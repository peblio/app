import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../Button/Button';

import './upgradeView.scss';

const UpgradeView = props => (
  <div className="upgrade-view">
    <div className="upgrade-view__container">
      <h1 className="upgrade-view__header">
        Peblio Classroom
      </h1>
      <h2 className="upgrade-view__sub-header">
        Upgrade to a Peblio teacher account for access to our classroom tools!
      </h2>
      <iframe
        width="100%"
        height="290"
        src="https://www.youtube.com/embed/8j0UDiN7my4"
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

UpgradeView.propTypes = {
  upgrade: PropTypes.func.isRequired
};

export default UpgradeView;
