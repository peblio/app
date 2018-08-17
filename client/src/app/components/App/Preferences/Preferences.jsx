import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as preferencesAction from '../../../action/preferences.js';

require('./preferences.scss');

class Preferences extends React.Component {
  render() {
    return (
      <section className="preferences__container">
        <div className="editor-preferences__container">
          <h2 className="preferences__heading">
            Code Editor
          </h2>
          <label htmlFor="height">Height (metres):</label>
          <input id="editor-font-size" type="number" value="14" />
        </div>
      </section>
    );
  }
}

Preferences.propTypes = {

};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...preferencesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
