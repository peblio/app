import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import formatDate from '../../../../utils/format-date';


class Pages extends Component {
  render() {
    return (
      <section className="profile-pages__container">
        <ul className="profile-pages__list">
          {this.props.pages.map((page) => {
            const link = `/pebl/${page.id}`;
            return (
              <li className="profile-pages__list-item" key={page.id}>
                <a className="profile-pages__link" href={link} target="_blank" rel="noopener noreferrer">
                  <h3 className="profile-pages__title">
                    {page.title}
                  </h3>
                  <p className="profile-pages__sub-title">
                    last update
                    {' '}
                    {formatDate(page.updatedAt)}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(null, mapDispatchToProps)(Pages);
