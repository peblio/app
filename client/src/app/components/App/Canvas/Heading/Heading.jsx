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

class Heading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorStudent: true,
      isParentAuthorStudent: true,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      axios.get(`/users/page/${this.props.id}`)
        .then((res) => {
          this.props.setPageAuthor(res.data.name);
          if (this.res.type && this.res.type !== 'student') {
            this.setState({ isAuthorStudent: false });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.parentId && (prevProps.parentId !== this.props.parentId)) {
      console.log('in here');
      axios.get(`/users/parentPageAuthor/${this.props.id}`)
        .then((res) => {
          this.props.setParentPageAuthor(res.data.name);
          if (this.res.type && this.res.type !== 'student') {
            this.setState({ isParentAuthorStudent: false });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {(this.props.pageHeading === '' && this.props.preview) || (
          <input
            type="text"
            className='canvas__title'
            placeholder="Enter title.."
            value={this.props.pageHeading}
            onChange={this.props.setPageHeading}
          />
        )}
        <p>
          {(this.props.pageAuthor) && (
            <p>
            by
              <a
                href={this.state.isAuthorStudent ? '/test' : 'popp'}
              >
                {' '}
                {this.props.pageAuthor}
              </a>
            </p>
          )}
          {(this.props.parentPageAuthor) && (
            <p>
              (Forked from
              <a>
                {' '}
                {this.props.parentPageAuthor}
              </a>
            )
            </p>
          )}
        </p>
      </div>
    );
  }
}


Heading.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Heading);
