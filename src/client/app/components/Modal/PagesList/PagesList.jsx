import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '../../../images/trash.svg';

require('./pagesList.scss');

class PagesList extends React.Component {
  componentDidMount() {
    this.props.fetchAllPages();
  }

  renderPages() {
    const pages = [];
    this.props.pages.forEach((page, index) => {
      const link = `/pebl/${page.id}`;
      pages.push(
        <li key={page.id}>
          <a href={link}> {page.title} </a>
          <button className="pages__delete" onClick={() => { this.props.deletePage({ page }); }}>
            <DeleteIcon alt="delete page" />
          </button>
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
  deletePage: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape).isRequired,
  fetchAllPages: PropTypes.func.isRequired
};

export default PagesList;
