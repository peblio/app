import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import dynamicSort from '../../../utils/sort-function';

import * as navigationAction from '../../../action/navigation.js';

require('./navigation.scss');

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const yNavigationContent = this.props.navigationContent;
      // debugger;
      const yNavigationLength = this.props.navigationContent.length;
      for (let i = yNavigationLength - 1; i >= 0; i--) {
        if (window.pageYOffset > yNavigationContent[i].y) {
          console.log(`${i} -- ${yNavigationContent[i].y} -- ${window.pageYOffset}`);
          this.props.setYNavigation(i);
          return;
        }
      }
      // this.props.navigationContent.reverse.forEach((navigationItem, i) => {
      //   if (window.pageYOffset > navigationItem.y) {
      //     console.log(`${i} -- ${navigationItem.y} -- ${window.pageYOffset}`);
      //     this.props.setYNavigation(i - 1);
      //     return i - 1;
      //   }
      // });
    });
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.yNavigation);
    // console.log(this.props.yNavigation);
    if (prevProps.yNavigation !== this.props.yNavigation) {
      this.forceUpdate();
    }
  }

  scrollTo=(y) => {
    window.scrollTo(0, y + 10);
  }

  render() {
    return (
      <section
        className={`navigation__container ${this.props.preview ? 'navigation__container--expanded' : ''}`}
      >
        <button
          className="navigation__close-button"
          onClick={this.props.closeNavigationContent}
        >
        ╳
        </button>
        <li className="navigation__items">
          {
            this.props.pageHeading !== '' && (
              <ul className="navigation__item-title">
                {this.props.pageHeading}
              </ul>
            )}
          {
            this.props.navigationContent.map((navItem, i) => (
              <ul className="navigation__item">
                <button
                  className={`navigation__button navigation__button-${navItem.type} ${(i === this.props.yNavigation) ? 'navigation__button--selected' : ''}`} // eslint-disable-line
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
  isNavigationOpen: PropTypes.bool.isRequired,
  navigationContent: PropTypes.arrayOf(PropTypes.shape).isRequired,
  pageHeading: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  yNavigation: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  isNavigationOpen: state.navigation.isNavigationOpen,
  navigationContent: state.navigation.navigationContent,
  pageHeading: state.page.pageHeading,
  preview: state.page.preview,
  yNavigation: state.navigation.yNavigation
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...navigationAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
