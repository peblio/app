import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import dynamicSort from '../../../utils/sort-function';

require('./navigation.scss');

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  scrollTo=(y) => {
    const yPos = y - 150;
    window.scrollTo(0, yPos);
  }

  render() {
    return (
      <section
        className={`navigation__container ${this.props.preview ? 'navigation__container--expanded' : ''}`}
      >
        <li className="navigation__items">
          {
            this.props.pageHeading !== '' && (
              <ul className="navigation__item-title">
                {this.props.pageHeading}
              </ul>
            )}
          {
            this.props.navigationContent.map(navItem => (
              <ul className="navigation__item">
                <button
                  className={`navigation__button navigation__button-${navItem.type}`}
                  onClick={() => { this.scrollTo(navItem.y); }}
                >
                  {navItem.content}
                </button>
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
  pageHeading: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  navigationContent: state.navigation.navigationContent,
  pageHeading: state.page.pageHeading,
  preview: state.page.preview,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
