import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addPageTag,
  deletePageTag
} from '../../../../action/page.js';
import axios from '../../../../utils/axios';

require('./tags.scss');

class Tags extends React.Component {
  addTag=(e) => {
    const tagName = e.target.value.toLowerCase().trim();
    if (e.keyCode === 13) {
      axios.post('/tags', {
        name: tagName
      })
        .then((result) => {
          document.querySelector('.tags__list-item:last-child').scrollIntoView(false);
        })
        .catch((error) => {
          console.log(error);
        });
      this.props.addPageTag(tagName);
      // TODO : Why do i need to forceupdate here?
      this.forceUpdate();
      e.target.value = '';
    }
  }

  renderTagsList(tags) {
    const tagsListClass = classNames('tags__list', {
      'tags__list--preview': (this.props.preview === true)
    });
    return (
      <ul className={classNames(tagsListClass)}>
        {tags && tags.map((tag, i) => (
          <li
            className="tags__list-item"
          >
            <p
              className="tags__name"
              data-test="tags-name"
            >
              {tag}
            </p>
            {!this.props.preview && (
              <button
                className="tags__delete-tag"
                onClick={() => this.props.deletePageTag(tag)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const tagsContainerClass = classNames('tags__container', {
      'tags__container--canvas': (this.props.container === 'canvas')
    });
    const tagsInputClass = classNames('tags__input', {
      'tags__input--modal': (this.props.container === 'modal')
    });
    return (
      <div className={classNames(tagsContainerClass)}>
        {!this.props.preview && (
          <input
            className={classNames(tagsInputClass)}
            type="text"
            placeholder="Enter tags.."
            onKeyDown={this.addTag}
            data-test="enter-tag"
          />
        )}
        {this.renderTagsList(this.props.tags)}
      </div>
    );
  }
}

Tags.propTypes = {
  container: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  preview: PropTypes.bool.isRequired,
  addPageTag: PropTypes.func.isRequired,
  deletePageTag: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    tags: state.page.tags
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  addPageTag,
  deletePageTag
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
