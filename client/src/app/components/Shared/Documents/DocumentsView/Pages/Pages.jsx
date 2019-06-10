import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Page from './Page';

import './pages.scss';

import {
  trashPage,
  renamePage,
  duplicatePage
} from '../../../../../action/page';

class Pages extends Component {
  render() {
    const documentViewCLass = classNames('profile-pebl__list', {
      'document-line': (this.props.documentView === 'line'),
      'document-block': (this.props.documentView === 'block')
    });
    return (
      <ul className={classNames(documentViewCLass)}>
        {this.props.pages && (
          <div className="profile-pebl__li-heading-container">
            <h4 className="profile-pebl__li-heading">
            name
            </h4>
            <h4 className="profile-pebl__li-heading">
            Last Modified
            </h4>
          </div>
        )}
        {this.props.pages && this.props.pages.map((page, key) => (
          <Page
            trashPage={this.props.trashPage}
            renamePage={this.props.renamePage}
            duplicatePage={this.props.duplicatePage}
            container={this.props.container}
            setShareURL={this.props.setShareURL}
            viewShareModal={this.props.viewShareModal}
            page={page}
            keyId={key}
          />

        ))}
      </ul>
    );
  }
}

Pages.propTypes = {
  container: PropTypes.string.isRequired,
  documentView: PropTypes.string.isRequired,
  duplicatePage: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  trashPage: PropTypes.func.isRequired,
  renamePage: PropTypes.func.isRequired,
  setShareURL: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    documentView: state.dashboard.documentView
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  duplicatePage,
  trashPage,
  renamePage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
