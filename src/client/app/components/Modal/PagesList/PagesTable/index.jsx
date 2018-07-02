import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PageRow from '../PageRow';

class PagesTable extends Component {
  render() {
    return (
      <table className="pages__table">
        <tbody>
          <tr className="pages__headrow">
            <th className="pages__header">Files</th>
            <th className="pages__header">Created</th>
            <th className="pages__header">Updated</th>
            <th className="pages__header"></th>
          </tr>
        </tbody>
        {this.props.pages.map(page => <PageRow key={page._id} page={page} />)}
      </table>
    );
  }
}

PagesTable.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default PagesTable;
