import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {playCode, stopCode, addEditor} from '../action/editorContainer.jsx';

import EditorContainer from './EditorContainer.jsx';
<<<<<<< HEAD
import Test from './Test.jsx';
import MainToolbar from './MainToolbar.jsx';
=======
import TextEditor from './TextEditor.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';
import MainToolbar from './MainToolbar.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';
>>>>>>> 9528e610b87f3dc7f34bdcc2dbef9841467c6254

class App extends React.Component {
  constructor(props) {
    super(props);

    this.renderEditors = this.renderEditors.bind(this);
  }
  componentDidUpdate() {
    console.log('**');
  }

  renderEditors() {
    let editors = [];
    let ids = Object.keys(this.props.editors);
    console.log(ids);
    ids.forEach((id) => {
      editors.push(<EditorContainer
        key={id}
        playCode = {()=>this.props.playCode(id)}
        stopCode = {() => this.props.stopCode(id)}
      />);
    });

    return editors;
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
            addEditor = {this.addEditor}
            addTextEditor = {this.addTextEditor}
          />
        </nav>
        <section>

          {Editors}
        </section>
      </div>
    );
  }

}

App.propTypes = {
  editors: PropTypes.array.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isPlaying: state.isPlaying,
    editors: state.editors
  };
}

const mapDispatchToProps = dispatch => {
  return {
    playCode : id => {
      dispatch(playCode(id));
    },
    stopCode : id => {
      dispatch(stopCode(id));
    },
    addEditor : () =>
    {
      dispatch(addEditor());
    }
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(App));
