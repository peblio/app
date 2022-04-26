import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Collection from '../Collection/Collection';
import SimpleSlider from './SimpleSlider/SimpleSlider';
import * as FeaturedConstants from './constants/featureConstants.js';

require('./featured.scss');

class Featured extends Component {
  constructor(props) {
    super(props);
  }

  renderCollections(collections) {
    const newCollections = [];
    collections.map((collection, i) => {
      newCollections.push(
        <li
          key={`collection-${i}`}
          className="featured-collections__collection"
        >
          <Collection
            key={`collection-${i}`}
            title={collection.title}
            link={collection.link}
            desc={collection.desc}
            author={collection.author}
            noFiles={collection.noFiles}
          />
        </li>
      );
    });
    return newCollections;
  }

  render() {
    return (
      <div className="featured__container">
        <div className="featured__sub-container">
          <h2
            className="featured__heading"
          >
            Popular Collections
          </h2>
          <ul
            className="featured__list"
          >
            <SimpleSlider
              items={this.renderCollections(FeaturedConstants.COLLECTIONS)}
              rows={1}
            />
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // tagName: state.tag.name,
    // studioPebls: state.tag.pebls,
    // totalPebls: state.tag.totalPebls
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  // setTagName,
  // getPeblsFromTag
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Featured);
