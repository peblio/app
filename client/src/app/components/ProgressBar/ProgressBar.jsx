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

  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  }

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
            { `${bytesToSize(completed)} out of ${bytesToSize(total)}`}
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
  units: PropTypes.string,
  showDetails: PropTypes.bool,
  style: PropTypes.shape({})
};

ProgressBar.defaultProps = {
  label: '',
  units: 'units',
  showDetails: true,
  style: {}
};

export default ProgressBar;
