import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import URL from 'url';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ImageUploadSVG from '../../../images/imageUpload.svg';
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

  }

  renderTrashPages=() => {
    // this.props.trashPages.forEach(page => (<div>page.title</div>));
  }

  render() {
    console.log(this.props.trashPages);
    return (
      <div className="trash__container">
        <div className="trash__sub-container">
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

export default connect(null, mapDispatchToProps)(Trash);
