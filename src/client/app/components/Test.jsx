import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {makeVisible} from '../action/test.jsx';

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button onClick={this.props.makeVisible}> Click me </button>
      </div>
    );
  }

}

Test.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  makeVisible: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isVisible: state.isVisible
  };
}

const mapDispatchToProps = dispatch => {
  return {
    makeVisible : () => {
      dispatch(makeVisible());
    }
  }
}


export default (connect(mapStateToProps, mapDispatchToProps)(Test));
