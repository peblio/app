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

  const memoryInMegaBytes = mem => Math.ceil(mem / 1000000);

  const memoryInGigaBytes = mem => Math.ceil(mem / 100000000);

  const getMemoryStringToDisplay = (mem) => {
    if (mem < 1073741824) {
      return `${memoryInMegaBytes(mem)} MB`;
    }
    return `${memoryInGigaBytes(mem)} GB`;
  };

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
            { `${getMemoryStringToDisplay(completed)} out of ${getMemoryStringToDisplay(total)}`}
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
