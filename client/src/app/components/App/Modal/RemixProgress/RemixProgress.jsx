import React from 'react';

require('./RemixProgress.scss');

class RemixProgress extends React.Component {
  render() {
    return (
      <div className="reset-modal__content">
        <h1 className="reset-modal__title">Remixing…</h1>
        <div className="forgot-modal__text">
          We’re saving a copy of this pebl to your account. I’ll only take a second
        </div>
      </div>
    );
  }
}

RemixProgress.propTypes = {};

export default RemixProgress;
