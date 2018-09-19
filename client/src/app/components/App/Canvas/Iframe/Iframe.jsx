import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

require('./iframe.scss');

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: props.contentType,
      iframeHistoryIndex: 0,
    };

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
        this.setState({ contentType: "embed" });
      } else {
        this.setState({ contentType: "url" });
      }

      this.props.setIframeURL(this.props.id, src);
      event.preventDefault();
    };
  }

  handleForward = () => {
    window.history.forward();
  }

  handleBack = () => {
    window.history.back();
  }

  renderNavigationOverlay() {
    return (
      <div className="embed-overlay__navigation">
        <div className="embed-overlay__navigation--buttons">
          <span className="icon__element" onClick={() => this.handleBack()}>
            <i className="ion-md-arrow-dropleft"></i>
          </span>
          <span className="icon__element" onClick={() => this.handleForward()}>
            <i className="ion-md-arrow-dropright"></i>
          </span>
        </div>

        <a
          href={this.props.iframeURL}
          target="_blank"
          className="icon__element"
        >
          <i className="ion-md-open"></i>
        </a>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="element__iframe">
          <iframe
            ref={ref => { this.iframeRef = ref; }}
            className="iframe__main"
            id="iframe-main"
            src={this.props.iframeURL}
          />

          {(this.props.preview && this.state.contentType === "url") &&
            this.renderNavigationOverlay()}
        </div>



        <form className="element__add-url" onSubmit={this.urlSubmitted.bind(this)}>
          <label htmlFor="element-name" className="element__label">
            Link
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
  preview: PropTypes.bool.isRequired,
  contentType: PropTypes.oneOf(["url", "embed"]).isRequired,
  iframeURL: PropTypes.string.isRequired,
  setIframeURL: PropTypes.func.isRequired
};
Iframe.defaultProps = {
  contentType: "url"
};

export default Iframe;
