import React from 'react';
import { RichUtils } from 'draft-js';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const axios = require('axios');

class PagesList extends React.Component {
  componentDidMount() {
    axios.get('/api/sketches')
      .then((res) => {
        this.props.setAllPages(res.data);
      });
  }

  renderPages() {
    const pages = [];
    this.props.pages.forEach((page, index) => {
      const link = `/page/${page.id}`;
      pages.push(
        <li>
          <a href={link}> {page.title} </a>
        </li>
      );
    });
    return pages;
  }

  render() {
    const Pages = this.renderPages();
    return (
      <div>
        <ul>
          {Pages}
        </ul>
      </div>
    );
  }
}

export default PagesList;
