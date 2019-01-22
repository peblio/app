import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setPageAuthor,
  setPageHeading,
  setParentPageAuthor
} from '../../../../action/page.js';
import axios from '../../../../utils/axios';
import ForkSVG from '../../../../images/fork.svg';


class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorStudent: true,
      isParentAuthorStudent: true,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      axios.get(`/users/pageAuthor/${this.props.id}`)
        .then((res) => {
          this.props.setPageAuthor(res.data.name);
          if (res.data.type && res.data.type !== 'student') {
            this.setState({ isAuthorStudent: false });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  renderTagsList() {
    return (
      <ul className="tags__list">
        <li className="tags__name">
      tag 1
        </li>
        <li className="tags__name">
      tag 2
        </li>
        <li className="tags__name">
      tag 3
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className="tags__container">
        All the tags
        <input className="tags__input" />
        {this.renderTagsList()}
      </div>
    );
  }
}

Tags.propTypes = {
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  pageAuthor: PropTypes.string.isRequired,
  parentPageAuthor: PropTypes.string.isRequired,
  pageHeading: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  setPageAuthor: PropTypes.func.isRequired,
  setPageHeading: PropTypes.func.isRequired,
  setParentPageAuthor: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    id: state.page.id,
    parentId: state.page.parentId,
    pageAuthor: state.page.pageAuthor,
    parentPageAuthor: state.page.parentPageAuthor,
    pageHeading: state.page.pageHeading,
    preview: state.page.preview,
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setPageAuthor,
  setPageHeading,
  setParentPageAuthor
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
