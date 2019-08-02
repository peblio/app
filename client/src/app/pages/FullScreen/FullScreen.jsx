import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Canvas from '../../components/App/Canvas/Canvas.jsx';


import {
  loadPage,
  setPageId,
  setPreviewMode
} from '../../action/page.js';
import {
  loadEditors,
} from '../../action/editors.js';
import {
  closeNavigationContent
} from '../../action/navigation.js';

import axios from '../../utils/axios';
import history from '../../utils/history';

require('./fullScreen.scss');

class FullScreen extends React.Component {
  componentDidMount() {
    this.getPage();
  }

  projectID = () => {
    const location = this.props.location.pathname;
    const projectID = location.match(/\/fullscreen\/([\w-].*)/);
    console.log(projectID);
    if (projectID) {
      this.props.setPageId(projectID[1]);
      return projectID[1];
    }
    this.props.setPageId('');
    return null;
  }

  getPage = () => {
    const projectID = this.projectID();
    axios.get(`/pages/${projectID}`)
      .then((res) => {
        this.props.loadPage(res.data[0].id, res.data[0].parentId, res.data[0].title, res.data[0].heading,
          res.data[0].description, res.data[0].layout, res.data[0].tags, res.data[0].isPublished);
        this.props.loadEditors(res.data[0].editors, res.data[0].editorIndex);
        this.props.setPreviewMode(true);
        this.props.closeNavigationContent();
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 404) {
          history.push('/404');
        }
      });
  }

  saveHTML = () => {
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


    const pageHTML = downloadDoc.documentElement.outerHTML;
    const tempEl = document.createElement('a');
    tempEl.href = `data:attachment/text,${encodeURI(pageHTML)}`;
    tempEl.target = '_blank';
    tempEl.download = 'thispage.html';
    tempEl.click();
  }

  render() {
    return (
      <section
        className="fullscreen__container"
      >
        <button
          onClick={this.saveHTML}
        >
        SAVE HTML
        </button>
        <Canvas />
      </section>
    );
  }
}

FullScreen.propTypes = {
  closeNavigationContent: PropTypes.func.isRequired,
  loadEditors: PropTypes.func.isRequired,
  loadPage: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  setPageId: PropTypes.func.isRequired,
  setPreviewMode: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  closeNavigationContent,
  loadEditors,
  loadPage,
  setPageId,
  setPreviewMode
}, dispatch);

export default connect(null, mapDispatchToProps)(FullScreen);
