import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button/Button';

import './assignmentCard.scss';

const AssignmentCard = props => (
  <div className="assignment-card-student">
    <div className="assignment-card-student__image-area">
    </div>
    <div className="assignment-card-student__details">
      <div className="assignment-card-student__details__title-area">
        <div className="assignment-card-student__details__title-area__title">
          Unit Overview : Storyboards with scratch
        </div>
        <Button
          className="primary"
          style={{
            height: '30px',
            padding: '6px 13px',
            fontSize: '14px'
          }}
        >
          Turn in
        </Button>
      </div>
    </div>
  </div>
);

AssignmentCard.propTypes = {

};

export default AssignmentCard;
