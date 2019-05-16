import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import URL from 'url';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeleteIcon from '../../../images/trash.svg';
import { setTrashPages } from '../../../action/dashboard.js';

import axios from '../../../utils/axios';

import './trash.scss';

class Trash extends React.Component {
  componentWillMount() {
    this.loadTrashedPages();
  }

  loadTrashedPages = () => {
    axios.get('/pages/trash')
      .then((data) => {
        console.log(data);
        this.props.setTrashPages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  restorePage = (id) => {
    axios.put(`/pages/trash/${id}`)
      .then((data) => {
        console.log(data);
        this.loadTrashedPages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deletePage = (id) => {
    axios.delete(`/pages/${id}`)
      .then((data) => {
        console.log(data);
        this.loadTrashedPages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderTrashPages=() => {
    const pages = [];
    this.props.trashPages.forEach((page) => {
      pages.push(
        <tr className="pages__row">
          <td className="pages__col pages__col_title">
            {page.title}
          </td>
          <td className="pages__col">

            <button
              className="pages__icon"
              onClick={() => { this.deletePage(page._id); }}
            >
              <DeleteIcon alt="delete page" />
            </button>
            <button
              className="pages__icon"
              onClick={() => { this.restorePage(page._id); }}
            >
              <DeleteIcon alt="restore page" />
            </button>
          </td>
        </tr>
      );
    });
    // this.props.trashPages.forEach(page => (<div>page.title</div>));
    return (pages);
  }

  render() {
    console.log(this.props.trashPages);
    return (
      <div className="trash__container">
        <div className="trash__table">
          {this.renderTrashPages()}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    trashPages: state.dashboard.trashPages
  };
}

Trash.propTypes = {
  // setDashboardView: PropTypes.func.isRequired,
  // location: PropTypes.shape({}).isRequired,
};


const mapDispatchToProps = dispatch => bindActionCreators({
  setTrashPages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
