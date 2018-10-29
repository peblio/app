import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import * as preferencesAction from '../../../action/preferences.js';

require('./preferences.scss');

class Preferences extends React.Component {
  componentWillUpdate(nextProps) {
    if (this.props.editorTheme !== nextProps.editorTheme) {
      this.editorTheme.value = nextProps.editorTheme;
    }
  }

  render() {
    const { preview, isPreferencesPanelOpen } = this.props;
    const prefClassName = classNames('preferences__container', {
      'preferences__container--open': isPreferencesPanelOpen
    });
    return (
      <section className={classNames(prefClassName)}>
        <div className="editor-preferences__container">
          <h2 className="preferences__heading">
            Code Editor
          </h2>
          <ul className="editor-preferences__list">
            <li className="editor-preferences__item">
              <h3 className="editor-preferences__sub-heading">
                Font Size
              </h3>
              <label
                className="editor-preferences__label"
                htmlFor="editor-font-size"
              >
                <input
                  className="editor-preferences__input"
                  id="editor-font-size"
                  name="editor-font-size"
                  type="number"
                  value={this.props.editorFontSize}
                  onChange={this.props.updateEditorFontSize}
                />
              </label>
            </li>

            <li className="editor-preferences__item">
              <h3 className="editor-preferences__sub-heading">
                Theme
              </h3>
              <label
                className="editor-preferences__label"
                htmlFor="editor-theme"
              >
                <select
                  className="editor-preferences__dropdown"
                  id="editor-theme"
                  name="editor-theme"
                  onChange={this.props.updateEditorTheme}
                  ref={(editorTheme) => { this.editorTheme = editorTheme; }}
                  value={this.props.editorTheme}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>
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
  isPreferencesPanelOpen: PropTypes.bool.isRequired,
  updateEditorFontSize: PropTypes.func.isRequired,
  updateEditorTheme: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editorFontSize: state.preferences.editorFontSize,
  editorTheme: state.preferences.editorTheme,
  isPreferencesPanelOpen: state.mainToolbar.isPreferencesPanelOpen
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...preferencesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
