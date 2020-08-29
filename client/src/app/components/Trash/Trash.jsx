import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardView from '../DashboardBase/DashboardBase';
import TrashComponent from './TrashComponent/TrashComponent';

const Trash = ({ name }) => (
  <DashboardView>
    <TrashComponent name={name} />
  </DashboardView>
);

Trash.propTypes = {
  name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  name: state.user.name
});

export default connect(mapStateToProps)(Trash);
