import React, { PropTypes } from 'react';

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
      <div className="pages_list">
        <p className="pages_title">Title</p>
        <ol>
          {Pages}
        </ol>
      </div>
    );
  }
}

PagesList.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setAllPages: PropTypes.func.isRequired
};

export default PagesList;
