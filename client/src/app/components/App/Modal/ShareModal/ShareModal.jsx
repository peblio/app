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

  downloadPebl(fileName) {
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
    mainScript.setAttribute('src', 'https://s3.amazonaws.com/staging.peblio.co/main.min.js');
    downloadDoc.head.appendChild(mainScript);
    // debugger;

    downloadDoc.body.innerHTML = '';
    const orgC = document.getElementById('content-canvas');
    const dupC = orgC.cloneNode(true);
    const orgL = document.getElementById('canvas__powered-by');
    const dupL = orgL.cloneNode(true);
    downloadDoc.body.appendChild(dupC);
    downloadDoc.body.appendChild(dupL);

    const pageHTML = downloadDoc.documentElement.outerHTML;

    const file = new Blob([(pageHTML)], { type: 'text/html;charset=utf-8;' });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
    {
      window.navigator.msSaveOrOpenBlob(file, `${fileName}.html`);
    } else { // Others
      const a = document.createElement('a');
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = `${fileName}.html`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
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
          Download File
          </h2>
          <a
            className="share__link"
            href={`${window.location.origin}/fullscreen/${this.props.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here to Preview
          </a>
          <input
            className="share__input"
            ref={(element) => { this.name = element; }}
            placeholder="Enter file name"
            data-test="share-modal__input"
          />
          <button
            className="share__button"
            onClick={() => { this.downloadPebl(this.name.value); }}
          >
          Download
          </button>
        </div>
      </section>
    );
  }
}

Share.propTypes = {
  id: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  shareURL: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  shareURL: state.mainToolbar.shareURL,
  id: state.page.id
});

export default connect(mapStateToProps, null)(Share);
