import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopNav from '../TopNav/TopNav';
import FreeCard from './FreeCard/FreeCard';
import TeacherCard from './TeacherCard/TeacherCard';

import DesignElements from '../../images/pricing-design-elements.svg';


import {
  viewLoginModal,
  viewSignUpModal,
  closeLoginModal,
  closeSignUpModal,
} from '../../action/mainToolbar.js';

import './pricing.scss';

const Pricing = (props) => {
  useEffect(() => {
    if (!props.user) {
      if (props.match.params.modal === 'login') {
        props.viewLoginModal();
      } else if (props.match.params.modal === 'signup') {
        props.viewSignUpModal();
      }
    } else if (props.match.params.modal === 'login') {
      props.closeLoginModal();
    } else if (props.match.params.modal === 'signup') {
      props.closeSignUpModal();
    }
  }, [props.user]);

  return (
    <div>
      <TopNav />
      <div className="pricing-spacer" />
      <div className="pricing">
        <h1>Choose a Plan</h1>
        <div className="pricing__container">
          <DesignElements className="pricing__design-element" />
          <div className="pricing__container__cards-section">
            <FreeCard active />
            <TeacherCard />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  viewLoginModal,
  viewSignUpModal,
  closeLoginModal,
  closeSignUpModal
}, dispatch);

Pricing.propTypes = {
  user: PropTypes.string.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      modal: PropTypes.string
    })
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
