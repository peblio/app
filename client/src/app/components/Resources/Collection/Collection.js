import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';

require('./collection.scss');

class Collection extends Component {
  render() {
    return (
      <div className="collection__container">
        <a
          className="collection__link collection__overlay"
          target="_blank"
          href={this.props.link}
          rel="noreferrer"
        >
          <p
            className="collection__overlay-desc"
          >
            {this.props.desc}
          </p>
          <p
            className="collection__overlay-author"
          >
            {this.props.author}
          </p>
        </a>
        <h1
          className="collection__title"
        >
          {this.props.title}
        </h1>
        <p
          className="collection__no-files"
        >
          {this.props.noFiles}
          {' '}
          Files
        </p>
      </div>
    );
  }
}

export default Collection;
