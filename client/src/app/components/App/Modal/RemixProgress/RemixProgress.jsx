import React from 'react';

require('./RemixProgress.scss');

class RemixProgress extends React.Component {
  render() {
    return (
      <div className="reset-modal__content">
        <h1 className="reset-modal__title">Please wait. We are remixing Page</h1>
      </div>
    );
  }
}

RemixProgress.propTypes = {};

export default RemixProgress;
