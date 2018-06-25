import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '../../../images/trash.svg';

require('./pagesList.scss');

function convertIsoDateToReadableDate(isoDate) {
  let readableDate = '';

  if (isoDate === '' || isoDate === null) {
    return readableDate;
  }

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const date = new Date(isoDate);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();
  const monthString = months[month];
  readableDate = `${day} ${monthString}, ${year}`;

  return readableDate;
}

class PagesList extends React.Component {
  componentDidMount() {
    this.props.fetchAllPages();
  }

  renderPages() {
    return this.props.pages.map((page) => {
      const link = `/pebl/${page.id}`;
      return (
        <tr className="pages__row" key={page.id}>
          <td className="pages__col" > <a className="pages__link" href={link}> {page.title} </a> </td>
          <td className="pages__col" > {convertIsoDateToReadableDate(page.createDate)} </td>
          <td className="pages__col" > {convertIsoDateToReadableDate(page.updateDate)} </td>
          <td className="pages__col" >
            <button className="pages__delete" onClick={() => { this.props.deletePage({ page }); }}>
              <DeleteIcon alt="delete page" />
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const Pages = this.renderPages();
    return (
      <div className="pages__list">
        <table className="pages__table">
          <tbody>
            <tr className="pages__headrow">
              <th className="pages__header">Title</th>
              <th className="pages__header">Creation Date</th>
              <th className="pages__header">Update Date</th>
              <th className="pages__header"></th>
            </tr>
            {Pages}
          </tbody>
        </table>
      </div>
    );
  }
}

PagesList.propTypes = {
  deletePage: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchAllPages: PropTypes.func.isRequired
};

export default PagesList;
