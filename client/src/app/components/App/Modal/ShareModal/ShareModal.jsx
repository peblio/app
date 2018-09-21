import PropTypes from 'prop-types';
import React from 'react';

require('./shareModal.scss');

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.copyShareLink = this.copyShareLink.bind(this);
  }

  componentDidMount() {
    this.renderClassroomWidget();
  }

  copyShareLink() {
    this.input.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.log(err);
    }
  }

  renderClassroomWidget() {
    gapi.sharetoclassroom.render(this.widget, //eslint-disable-line
      { size: 64,
        url: window.location.href });
  }

  render() {
    return (
      <section className="share__container">
        <div className="share__option">
          <h2 className="share__text-primary">
            {' '}
            Share
            {this.props.pageTitle}
            {' '}
            via Link
            {' '}
          </h2>
          <input
            className="share__input"
            ref={(element) => { this.input = element; }}
            value={window.location.href}
            readOnly
          />
          <button
            className="share__link"
            onClick={this.copyShareLink}
          >
            copy to clipboard
          </button>
        </div>
        <p className="share__text-secondary">or</p>
        <div className="share__option">
          <h2 className="share__text-primary"> share to Google Classroom </h2>
          <div
            id="widget-div"
            ref={(element) => { this.widget = element; }}
          >
          </div>
        </div>
      </section>
    );
  }
}

Share.propTypes = {
  pageTitle: PropTypes.string.isRequired
};

export default Share;
