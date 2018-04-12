import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import PropTypes from 'prop-types';
import DragSVG from '../images/drag.svg';
import CloseSVG from '../images/close.svg';

class ImageBackUp extends React.Component {
  constructor(props) {
    super(props);

    this.setCurrentEditor = () => { this.props.setCurrentEditor(this.props.id); };
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.onChange = (state) => { this.props.onChange(this.props.id, state); };
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
  }

  uploadImageCallBack(file) {
    console.log(file);
    return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID cb587da0a13d347');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
        console.log(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
  }

  render() {
    return (
      <div
        id={this.props.id}
        onFocus={this.setCurrentEditor.bind(this)}
        className={`text-editor__container ${this.props.preview ? '' : 'text-editor__container--edit'}`}
      >
        { this.props.preview ||
          <nav className="element__nav">
            <button
              className="element__close"
              onClick={this.removeEditor.bind(this)}
            >
              <CloseSVG alt="close element" />
            </button>
            <button className={`element__close element__drag drag__${this.props.id}`}>
              <DragSVG alt="drag element" />
            </button>
          </nav>
        }
        <Editor
          id={this.props.id}
          toolbar={{
            options: ['image'],
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: false },
              alignmentEnabled: false,
              className: 'mathura',
              popupClassName: 'potatoes',
              defaultSize: {
                height: '100%',
                width: '100%',
              },
            },

          }}
          toolbarClassName="text-editor__toolbar"
          editorClassName="text-editor__content"
          editorState={this.props.imageState}
          onEditorStateChange={this.onChange.bind(this)}
          placeholder="Enter some text..."
          spellCheck={!this.props.preview}
          readOnly={this.props.preview}
        />
      </div>
    );
  }
}

ImageBackUp.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func.isRequired
};

export default ImageBackUp;
