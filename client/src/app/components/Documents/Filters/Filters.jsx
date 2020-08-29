import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import InputField from '../../InputField/InputField';
import IconButton from '../../IconButton/IconButton';
import Dropdown from '../../Dropdown/Dropdown';

// actions
import {
  setDashboardView,
  setDocumentSort,
  setDocumentView,
  searchByTitle,
  clearSearchByTitle,
  toggleAddNewMenu,
  loadMemoryConsumed
} from '../../../action/dashboard';
import {
  createFolder,
  createPage
} from '../../../action/page.js';

// logos
import Block from '../../../images/block.svg';
import Line from '../../../images/stack.svg';
import ClearFilter from '../../../images/clearFilter.svg';

import './filters.scss';

const Filters = (props) => {
  const [search, setSearch] = useState('');

  const handleSearchByTitle = (e) => {
    if (e.target.value === '') {
      props.clearSearchByTitle();
      return;
    }
    props.searchByTitle(e.target.value);
  };

  const handleViewChange = () => {
    if (props.documentView === 'line') {
      props.setDocumentView('block');
    } else {
      props.setDocumentView('line');
    }
  };

  const handleClearFilter = () => {
    setSearch(() => '');
    props.clearSearchByTitle();
  };

  return (
    <div className="documents__filters">
      <div className="documents__filters__label">
        Search files
      </div>
      <InputField
        state={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearchByTitle(e);
        }}
        placeholder="File name"
        containerWidth='370px'
        style={{
          background: '#fff',
        }}
      />
      <div className="documents__filters__label">
        Arrange By
      </div>
      <Dropdown
        placeholder="Title"
        style={{
          width: '136px',
        }}
        options={[
          {
            name: 'Title',
            value: 'title',
            onClick: () => { props.setDocumentSort('title'); }
          }, {
            name: 'Updated At',
            value: 'update',
            onClick: () => { props.setDocumentSort('-updatedAt'); }
          }
        ]}
      />
      <IconButton
        icon={<ClearFilter />}
        style={{ marginLeft: 'auto' }}
        onClick={handleClearFilter}
        id='clear-filter'
      />
      <IconButton
        icon={props.documentView === 'line' ? <Block /> : <Line />}
        onClick={handleViewChange}
      />
    </div>
  );
};

Filters.propTypes = {
  setDocumentView: PropTypes.func.isRequired,
  searchByTitle: PropTypes.func.isRequired,
  clearSearchByTitle: PropTypes.func.isRequired,
  setDocumentSort: PropTypes.func.isRequired,
  documentView: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  documentView: state.dashboard.documentView,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setDocumentView,
  searchByTitle,
  setDocumentSort,
  clearSearchByTitle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
