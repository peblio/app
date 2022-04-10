import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import axios from '../../../utils/axios';

require('./pebl.scss');

class Pebl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      description: '',
      updatedAt: '',
      image: 'https://s3.amazonaws.com/peblio-files/_Pebl_Snapshots/default.png'
    };
  }

  componentDidMount() {
    const pageId = this.props.id;
    this.getPeblAuthor(pageId);
    this.getPeblDetails(pageId);
  }

  getPeblDetails = (pageId) => {
    const url = `https://api.peblio.co/api/pages/${pageId}`;
    axios.get(url)
      .then((response) => {
        if (response.data[0]) {
          this.setState({ description: response.data[0].description });
          this.setState({ updatedAt: response.data[0].updatedAt });
          if (response.data[0].snapshotPath) {
            this.setState({ image: response.data[0].snapshotPath });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPeblAuthor = (pageId) => {
    const url = `https://api.peblio.co/api/users/pageAuthor/${pageId}`;
    axios.get(url)
      .then((response) => {
        this.setState({ userName: response.data.name });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={`pebl__container pebl__container-${this.props.number}`}>
        <a
          className="pebl__link pebl__overlay"
          target="_blank"
          href={`https://demo.peblio.co/pebl/${this.props.id}`}
          rel="noreferrer"
        >
          <div>
            <h1
              className="pebl__overlay-title"
            >
              {this.props.title}
            </h1>
            <p
              className="pebl__overlay-desc"
            >
              {this.state.description}
            </p>
          </div>
          <p
            className="pebl__overlay-author"
          >
            {this.state.userName}
          </p>
        </a>

        <img
          src={this.state.image}
          className="pebl__image"
        />
        <h1
          className="pebl__title"
        >
          {this.props.title}
        </h1>
        <div className="pebl__info">
          <p
            className="pebl__sub-info"
          >
            {this.state.userName}
          </p>
          <p
            className="pebl__sub-info"
          >
            {moment(this.state.updatedAt).format('DD/MMM/YYYY')}
          </p>
        </div>

      </div>
    );
  }
}

export default Pebl;
