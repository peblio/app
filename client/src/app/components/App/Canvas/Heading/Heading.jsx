import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setPageHeading,
} from '../../../../action/page.js';
import axios from '../../../../utils/axios';

class Heading extends React.Component {
  componentDidMount() {
    console.log('heading did mount');
    if (this.props.id) {
      console.log('yes');
    } else {
      console.log('no');
    }
    axios.get('/examples')
      .then((res) => {
        res.data.forEach((example) => {
          temp.push({
            id: example.id,
            title: example.title
          });
        });
        this.setState({ examples: temp });
      });
  }

  render() {
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
          {' '}
          by
          <a> human 1 </a>
          {' '}
          (Forked from
          <a> human 2 </a>
          )
        </p>
      </div>
    );
  }
}


Heading.propTypes = {
  id: PropTypes.string.isRequired,
  pageHeading: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  setPageHeading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    id: state.page.id,
    pageHeading: state.page.pageHeading,
    preview: state.page.preview,
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setPageHeading,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Heading);
