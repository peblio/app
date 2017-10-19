import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {playCode, stopCode, addEditor} from '../action/editorContainer.jsx';

import EditorContainer from './EditorContainer.jsx';
import Test from './Test.jsx';
import TextEditor from './TextEditor.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';
import MainToolbar from './MainToolbar.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

import * as editorActions from '../action/editorContainer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditors = this.renderEditors.bind(this);
  }
  componentDidUpdate() {
  }

  renderEditors() {
    let editorsHTML = [];
    let ids = Object.keys(this.props.editors);
    ids.forEach((id) => {
      editorsHTML.push(<EditorContainer
        key={id}
        editorId={id}
        playCode = {this.props.playCode}
        stopCode = {this.props.stopCode}
        updateCode = {this.props.updateCode}
        isPlaying = {this.props.editors[id].isPlaying}
        editorMode = {this.props.editors[id].editorMode}
        code = {this.props.editors[id].code}
        setCurrentEditor = {this.props.setCurrentEditor}
      />);
    });
    return editorsHTML;
  }

  render() {
    const Editors = this.renderEditors();
    return (
      <div>
        <nav>
          <MainToolbar
            _onBoldClick = {this._onBoldClick}
            _onItalicClick = {this._onItalicClick}
            _onUnderlineClick = {this._onUnderlineClick}
            _onCodeClick = {this._onCodeClick}
            _onFontChange = {this._onFontChange}
            _onFontfaceChange = {this._onFontfaceChange}
            addEditor = {this.props.addEditor}
            addTextEditor = {this.addTextEditor}
          />
        </nav>
        <div>
          {this.props.noOfEditors}
          {Editors}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  editors: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  addEditor: PropTypes.func.isRequired,
  noOfEditors: PropTypes.number.isRequired,
  setCurrentEditor: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isPlaying: state.isPlaying,
    editors: state.editors,
    noOfEditors: state.noOfEditors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    editorActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(App));
