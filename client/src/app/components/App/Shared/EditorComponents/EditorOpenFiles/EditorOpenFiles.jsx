import React from 'react';

class EditorOpenFiles extends React.Component {
  render() {
    return (
      <ul>
        {this.props.files.map((file, index) => {
          console.log(file.isFileInView);
          if (typeof file.isFileInView === 'undefined' || file.isFileInView) {
            return (
              <li>
                <p>
                  {file.name}
                </p>
                <button
                  onClick={() => this.props.closeFileView(this.props.id, index)}
                >
                  Close
                </button>
              </li>
            );
          }
        })
        }
        I am a potato
      </ul>
    );
  }
}

export default EditorOpenFiles;
