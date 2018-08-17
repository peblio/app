import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as preferencesAction from '../../../action/preferences.js';

require('./preferences.scss');

class Preferences extends React.Component {
  componentDidMount() {
    this.editorTheme.value = this.props.editorTheme;
  }
  render() {
    return (
      <section className="preferences__container">
        <div className="editor-preferences__container">
          <h2 className="preferences__heading">
            Code Editor
          </h2>
          <ul className="editor-preferences__list">
            <li className="editor-preferences__item">
              <label
                htmlFor="editor-font-size"
              >
                Font-size
              </label>
              <input
                className="editor-preferences__input"
                id="editor-font-size"
                type="number"
                value={this.props.editorFontSize}
                onChange={this.props.updateEditorFontSize}
              />
            </li>

            <li className="editor-preferences__item">
              <label
                htmlFor="editor-theme"
              >
                Theme
              </label>
              <select
                id="editor-theme"
                name="theme"
                onChange={this.props.updateEditorTheme}
                ref={(editorTheme) => { this.editorTheme = editorTheme; }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

Preferences.propTypes = {
  editorFontSize: PropTypes.number.isRequired,
  editorTheme: PropTypes.string.isRequired,
  updateEditorFontSize: PropTypes.func.isRequired,
  updateEditorTheme: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editorFontSize: state.preferences.editorFontSize,
  editorTheme: state.preferences.editorTheme
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...preferencesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
