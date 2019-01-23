import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addPageTag,
  deletePageTag
} from '../../../../action/page.js';
import axios from '../../../../utils/axios';


class Tags extends React.Component {
  addTag=(e) => {
    const tagName = e.target.value;
    if (e.keyCode === 13) {
      axios.post('/tags', {
        name: tagName
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.props.addPageTag(tagName);
      this.forceUpdate();
      e.target.value = '';
    }
  }

  renderTagsList(tags) {
    const tests = [1, 2, 3];
    return (
      <ul className="tags__list">
        {tags.map((tag, i) => (
          <li
            className="tags__name"
          >
            <p>
              {tag}
            </p>
            <button
              className="navigation__option-button"
              onClick={() => this.props.deletePageTag(tag)}
            >
              <i className="fas fa-times"></i>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="tags__container">
        All the tags
        <input
          className="tags__input"
          type="text"
          placeholder="Enter tags.."
          onKeyDown={this.addTag}
        />
        {this.renderTagsList(this.props.tags)}
      </div>
    );
  }
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  preview: PropTypes.bool.isRequired,
  addPageTag: PropTypes.func.isRequired,
  deletePageTag: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    tags: state.page.tags,
    preview: state.page.preview,
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  addPageTag,
  deletePageTag
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
