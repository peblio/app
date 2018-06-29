import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import formatDate from '../../../utils/format-date.js';
import { deletePage } from '../../../action/page.js';
import DeleteIcon from '../../../images/trash.svg';

class PageRow extends Component {
  render() {
    // page.id is a shortid that is NOT the same thing as page._id or the id prop
    const { id, page } = this.props;
    const link = `/pebl/${page.id}`;
    return (
      <tr className="pages__row" key={id}>
        <td className="pages__col" > <a className="pages__link" href={link}> {page.title} </a> </td>
        <td className="pages__col" > {formatDate(page.createdAt)} </td>
        <td className="pages__col" > {formatDate(page.updatedAt)} </td>
        <td className="pages__col" >
          <button className="pages__delete" onClick={() => { this.props.deletePage(id); }}>
            <DeleteIcon alt="delete page" />
          </button>
        </td>
      </tr>
    );
  }
}

PageRow.propTypes = {
  deletePage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  page: PropTypes.shape({}).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  page: state.page.pages.byId[ownProps.id]
});
const mapDispatchToProps = dispatch => bindActionCreators({ deletePage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageRow);
