import React from 'react';
import PropTypes from 'prop-types';

import './progressBar.scss';

const ProgressBar = ({
  total,
  completed,
  containerWidth,
  label,
  units,
  showDetails,
  style
}) => {
  const completionWidthCalc = (comp, tot) => (completed / total) * 100;

  return (
    <div className='progress-bar' style={{ width: containerWidth, ...style }}>
      {label && <div className='progress-bar__label'>{label}</div>}
      <div className='progress-bar__total'>
        <span
          className='progress-bar__completed'
          style={{ width: `${completionWidthCalc(completed, total)}%` }}
        >
        </span>
      </div>
      {
        showDetails && (
          <div className="progress-bar__details">
            { `${completed} ${units} out of ${total} ${units}`}
          </div>
        )
      }
    </div>
  );
};

ProgressBar.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  containerWidth: PropTypes.string.isRequired,
  label: PropTypes.string,
  units: PropTypes.number,
  showDetails: PropTypes.bool,
  style: PropTypes.node
};

ProgressBar.defaultProps = {
  label: '',
  units: 'units',
  showDetails: true,
  style: {}
};

export default ProgressBar;
