import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setDashboardView } from '../../../action/dashboard.js';

// import './nav.scss';

class Nav extends React.Component {
  render() {
    return (
      <div className="dashboard-nav__container">
        <ul className="dashboard-nav__list">
          <li className="dashboard-nav__list-item">
            <button
              className="dashboard-nav__button"
              onClick={() => { this.props.setDashboardView(0); }}
            >
              Documents
            </button>
          </li>
          <li className="dashboard-nav__list-item">
            <button
              className="dashboard-nav__button"
              onClick={() => { this.props.setDashboardView(1); }}
            >
              Account
            </button>
          </li>
          <li className="dashboard-nav__list-item">
            <button
              className="dashboard-nav__button"
              onClick={() => { this.props.setDashboardView(3); }}
            >
              Trash
            </button>
          </li>
          <li className="dashboard-nav__list-item">
            <button
              className="dashboard-nav__button"
              onClick={() => { this.props.setDashboardView(3); }}
            >
              Profile
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

Nav.propTypes = {
  blurb: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  setProfileBlurb: PropTypes.func.isRequired
};
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  setDashboardView
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
