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

  render() {
    console.log(this.props.navigationContent);
    return (
      <section className="navigation__container">
        <li className="navigation__items">
          {
            this.props.pageTitle !== '' && (
              <ul className="navigation__item-title">
                {this.props.pageTitle}
              </ul>
            )}
          {
            this.props.navigationContent.map(navItem => (
              <ul className={`navigation__item-${navItem.type}`}>
                {navItem.content}
              </ul>
            ))
          }
        </li>
      </section>
    );
  }
}

Navigation.propTypes = {
  navigationContent: PropTypes.arrayOf(PropTypes.shape).isRequired,
  pageTitle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  navigationContent: state.navigation.navigationContent,
  pageTitle: state.page.pageTitle
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
