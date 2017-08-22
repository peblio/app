import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {playCode, stopCode, addEditor} from '../action/editorContainer.jsx';

import EditorContainer from './EditorContainer.jsx';
import Test from './Test.jsx';
import MainToolbar from './MainToolbar.jsx';

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
        <section>
          <MainToolbar
            addEditor = {this.props.addEditor}
          />
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
