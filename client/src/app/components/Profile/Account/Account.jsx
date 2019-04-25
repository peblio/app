import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ToolbarLogo from '../../../images/logo.svg';


class Account extends React.Component {
  render() {
    return (
      <div className="details__content">
        <a className="details__link" href="/" target="_blank" rel="noopener noreferrer">
          <ToolbarLogo className="details__logo" alt="logo in toolbar" />
        </a>
        <div className="details__container">

          <div
            className="details__image-container"
          >
            <img className="details__image" src={this.props.image} alt="profile" />
          </div>
          <div className="details__text-primary">
            {' '}
            {this.props.name}
            {' '}
          </div>

          <p
            className="details__text-secondary"
          >
            {this.props.blurb}
          </p>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  blurb: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
  return {
    image: state.profile.image,
    name: state.profile.name,
    blurb: state.profile.blurb,
  };
}

export default (connect(mapStateToProps, null)(Account));
