import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentEditor = () => { this.props.setCurrentEditor(this.props.id); };
    this.urlSubmitted = (event) => {
      const tempString = this.url.value;
      const src = ReactHtmlParser(tempString)[0].props ? ReactHtmlParser(tempString)[0].props.src : tempString;
      this.props.setIframeURL(this.props.id, src);
      event.preventDefault();
    };
  }

  render() {
    return (
      <div>
        <div className="element__iframe">
          <iframe src={this.props.iframeURL} />
        </div>
        <form className="element__add-url" onSubmit={this.urlSubmitted.bind(this)}>
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
  id: PropTypes.string.isRequired,
  iframeURL: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  setIframeURL: PropTypes.func.isRequired
};

export default Iframe;
