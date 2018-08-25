import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

require('./iframe.scss');

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.urlSubmitted = (event) => {
      const tempString = this.url.value;
      let src = ReactHtmlParser(tempString)[0].props ? ReactHtmlParser(tempString)[0].props.src : tempString;
      // Adding for edge cases like microbits, where they wrap the iframe around a div
      if (ReactHtmlParser(tempString)[0].props) {
        if (ReactHtmlParser(tempString)[0].props.children) {
          ReactHtmlParser(tempString)[0].props.children.forEach((child) => {
            src = child.props ? child.props.src : src;
          });
        }
      }
      this.props.setIframeURL(this.props.id, src);
      event.preventDefault();
    };
  }

  render() {
    return (
      <div>
        <div className="element__iframe">
          <iframe className="iframe__main" title="iframe__main" src={this.props.iframeURL} />
        </div>
        <form className="element__add-url" onSubmit={this.urlSubmitted.bind(this)}>
          <label htmlFor="element-name" className="element__label">
            URL
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
  setIframeURL: PropTypes.func.isRequired
};

export default Iframe;
