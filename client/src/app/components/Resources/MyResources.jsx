import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import './MyResources.scss';
import GenericLoader from '../GenericLoader/LoadingMessage';
import Pebls from './Pebls/Pebls';

import { setTagName } from '../../action/resources';

const MyResources = ({
  // eslint-disable-next-line no-shadow
  userName,
  // eslint-disable-next-line no-shadow
  setTagName
}) => {
  const [dataLoading, setDataLoading] = useState(true);
  const tagSearchText = useRef(null);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setTagName(e.target.value);
    }
  };
  useEffect(() => {
    setDataLoading(true);
    setDataLoading(false);
  },
  []);


  return (
    <React.Fragment>
      {dataLoading ? <GenericLoader /> : (
        <div className="dashboard__myresources">
          <span className="dashboard__myresources__header">
            Popular Resources for
            {userName}
          </span>
          <p className="dashboard__myresources__header__title">
            Search for Resources
          </p>
          <div className="tag-input__sub-container">
            <i className="fa fa-search tag-input__icon" aria-hidden="true"></i>
            <input
              className="tag-input__input"
              type="text"
              placeholder="enter tags..."
              onKeyPress={handleKeyPress}
              ref={tagSearchText}
            />
          </div>
          <div>
            <Pebls />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

MyResources.propTypes = {
  userName: PropTypes.string.isRequired,
  setTagName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userName: state.user.userName,
  tagName: state.resources.tagName
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setTagName
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(MyResources);
