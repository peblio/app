import React from 'react';
import PropTypes from 'prop-types';
import DragSVG from '../images/drag.svg';
import CloseSVG from '../images/close.svg';

class Iframe extends React.Component {
  constructor(props) {
    super(props);

    const i = this.props.index;
    this.setCurrentEditor = () => { this.props.setCurrentEditor(i); };
    this.removeEditor = () => { this.props.removeEditor(i); };
    this.urlSubmitted = (event) => {
      this.props.setIframeURL(i, this.url.value);
      event.preventDefault();
    };
  }

  render() {
    return (
      <div className="element__iframe" id={this.props.id} onFocus={this.setCurrentEditor}>
        { this.props.preview ||
          <nav>
            <button className="element__close" onClick={this.removeEditor}><CloseSVG alt="close element" /></button>
            <button className={`element__close drag__${this.props.id}`}><DragSVG alt="drag element" /></button>
          </nav>
        }
        <div>
          <iframe src={this.props.iframeURL} />
        </div>
        <form className="element__addURL" onSubmit={this.urlSubmitted}>
          <label htmlFor="element-name" className="element__label"> URL
            <input
              id="element-name"
              className="element__input"
              type="text"
              ref={(element) => { this.url = element; }}
              defaultValue={this.props.iframeURL}
              readOnly={this.props.preview}
            />
          </label>
          <input className="element__button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

Iframe.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  iframeURL: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  setIframeURL: PropTypes.func.isRequired
};

export default Iframe;
