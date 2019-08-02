import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

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

  downloadPebl() {
    const downloadDoc = document.cloneNode(true);
    const head = downloadDoc.head;

    // remove scripts
    const scripts = head.getElementsByTagName('script');
    let noScripts = scripts.length;
    while (noScripts) {
      noScripts--;
      scripts[noScripts].parentNode.removeChild(scripts[noScripts]);
    }

    // remove links
    const links = head.getElementsByTagName('link');
    let noLinks = links.length;
    while (noLinks) {
      noLinks--;
      links[noLinks].parentNode.removeChild(links[noLinks]);
    }

    // add main.js
    const mainScript = downloadDoc.createElement('script');
    mainScript.setAttribute('src', 'https://s3.amazonaws.com/staging.peblio.co/main.js');
    downloadDoc.head.appendChild(mainScript);
    debugger;


    const pageHTML = downloadDoc.documentElement.outerHTML;
    const tempEl = document.createElement('a');
    tempEl.href = `data:attachment/text,${encodeURI(pageHTML)}`;
    tempEl.target = '_blank';
    tempEl.download = 'thispage.html';
    tempEl.click();
  }

  renderClassroomWidget() {
    gapi.sharetoclassroom.render(this.widget, //eslint-disable-line
      { size: 64,
        url: this.props.shareURL });
  }

  render() {
    return (
      <section className="share__container">
        <div className="share__option">
          <h2 className="share__text-primary">
            Share
            {' '}
            {this.props.pageTitle}
            {' '}
            via Link
          </h2>
          <input
            className="share__input"
            ref={(element) => { this.input = element; }}
            value={this.props.shareURL}
            data-test="share-modal__input"
            readOnly
          />
          <button
            className="share__link"
            onClick={this.copyShareLink}
          >
            copy to clipboard
          </button>
        </div>
        <button
          className="share__button"
          onClick={this.downloadPebl}
        >
          Download
        </button>
      </section>
    );
  }
}

Share.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  shareURL: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  shareURL: state.mainToolbar.shareURL
});

export default connect(mapStateToProps, null)(Share);
