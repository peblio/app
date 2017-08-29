import React from 'react';

class TextToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="textToolbar__container">
        <button className="textToolbar__button"
          onClick={this.props._onBoldClick}
        >
          Bold
        </button>
        <button className="textToolbar__button"
          onClick={this.props._onUnderlineClick}
        >
          Underline
        </button>
        <button className="textToolbar__button"
          onClick={this.props._onItalicClick}
        >
          Italics
        </button>
        <button className="textToolbar__button"
          onClick={this.props._onCodeClick}
        >
          Strike
        </button>
        <select className="textToolbar__select" name="fontface" onChange={this.props._onFontfaceChange}>
          <option value="Arial, Helvetica, sans-serif">Arial</option>
          <option value="Impact, Charcoal, sans-serif">Impact</option>
          <option value="Times New Roman, Times, serif">Times New Roman</option>
        </select>
        <select className="textToolbar__select" name="font-size" onChange={this.props._onFontChange}>
          <option value="20">20</option>
          <option value="24">24</option>
          <option value="32">32</option>
          <option value="48">48</option>
        </select>
      </div>
    );
  }
}

export default TextToolbar;
