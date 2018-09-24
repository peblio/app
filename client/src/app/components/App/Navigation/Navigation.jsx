import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import dynamicSort from '../../../utils/sort-function';
// import FolderContainer from './FolderContainer/FolderContainer.jsx';
// import { fetchAllPages } from '../../../../action/page';

require('./navigation.scss');

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {

  }

  render() {
    // const localLayout = this.props.layout;
    console.log(this.props.navigationContent);
    return (
      <section className="navigation__container">
        Much navigation
      </section>
    );
  }
}

Navigation.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.shape).isRequired
};

const mapStateToProps = state => ({
  navigationContent: state.navigation.navigationContent
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
