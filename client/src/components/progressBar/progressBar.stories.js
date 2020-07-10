import React from 'react';
import ProgressBar from '../../app/components/ProgressBar/ProgressBar';


export default { title: 'ProgressBar' };

export const progressBar = () => (
  <ProgressBar
    total={20}
    completed={10}
    containerWidth='150px'
    label="LABEL"
    units="units"
    showDetails
  />
);

export const withoutLabelAndUnits = () => (
  <ProgressBar
    total={20}
    completed={10}
    containerWidth='150px'
    units="units"
    showDetails={false}
  />
);
