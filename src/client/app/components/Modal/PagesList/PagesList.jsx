import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '../../../images/trash.svg';

require('./pagesList.scss');

class PagesList extends React.Component {
  componentDidMount() {
    this.props.fetchAllPages();
  }

  renderPages() {
    return this.props.pages.map((page) => {
      const link = `/pebl/${page.id}`;
      return (
        <li key={page.id}>
          <a href={link}> {page.title} </a>
          <button className="pages__delete" onClick={() => { this.props.deletePage({ page }); }}>
            <DeleteIcon alt="delete page" />
          </button>
        </li>
      );
    });
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
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchAllPages: PropTypes.func.isRequired
};

export default PagesList;
