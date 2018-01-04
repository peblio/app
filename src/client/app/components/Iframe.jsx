import React, { PropTypes } from 'react';
import DragSVG from '../images/drag.svg';
import CloseSVG from '../images/close.svg';

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.iframeURL !== prevProps.iframeURL
      || this.props.x !== prevProps.x
      || this.props.y !== prevProps.y) {
      this.props.setUnsavedChanges(true);
    }
  }
  onFocus() {
    this.props.setCurrentIframe(this.props.id);
  }
  urlSubmitted(event) {
    this.props.setIframeURL(this.url.value);
    event.preventDefault();
  }
  render() {
    const dragClassName = `element__close drag__${this.props.id}`;
    return (
      <div className="element__iframe" id={this.props.id} onFocus={this.onFocus}>
        <nav>
          <button className="element__close" onClick={() => this.props.removeIframe(this.props.id)}><CloseSVG alt="close element" /></button>
          <button className={dragClassName}><DragSVG alt="drag element" /></button>
        </nav>
        <div>
          <iframe src={this.props.iframeURL} />
        </div>
        <form className="element__addURL" onSubmit={(event) => { this.urlSubmitted(event); }}>
          <label htmlFor="element-name" className="element__label"> URL
            <input id="element-name" className="element__input" type="text" ref={(element) => { this.url = element; }} defaultValue={this.props.iframeURL} />
          </label>
          <input className="element__button" type="submit" value="Submit" />
        </form>

      </div>
    );
  }
}

Iframe.propTypes = {
  id: PropTypes.string.isRequired,
  iframeURL: PropTypes.string.isRequired,
  removeIframe: PropTypes.func.isRequired,
  setCurrentIframe: PropTypes.func.isRequired,
  setIframeURL: PropTypes.func.isRequired,
  setUnsavedChanges: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Iframe;
