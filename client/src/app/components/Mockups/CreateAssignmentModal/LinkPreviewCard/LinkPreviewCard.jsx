import PropTypes from 'prop-types';
import React from 'react';
import CloseIcon from '../../../../images/close.svg';
import './linkPreviewCard.scss';

const LinkPreviewCard = ({ title, removeAction, previewURL, ...props }) => (
  <div className="link-preview-card">
    <div className="link-preview-card__preview" style={{ backgroundImage: `url(${previewURL})` }}>
    </div>
    <div className="link-preview-card__description">
      <div className="link-preview-card__description__title">
        {title}
      </div>
      <div className="link-preview-card__description__footer">
        <span>copy</span>
        {' '}
        for each student
      </div>
    </div>
    <button type="button" className="link-preview-card__remove" onClick={removeAction}>
      <CloseIcon />
    </button>
  </div>
);

LinkPreviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  removeAction: PropTypes.func.isRequired,
  previewURL: PropTypes.string.isRequired
};

export default LinkPreviewCard;
