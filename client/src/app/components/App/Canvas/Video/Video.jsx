import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setIframeURL } from '../../../../action/editors.js';

// require('./iframe.scss');

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.urlSubmitted = (event) => {
      const tempString = this.url.value;
      let src = '';
      const parsedString = ReactHtmlParser(tempString);
      src = (parsedString[0].props && parsedString[0].type === 'iframe') ? parsedString[0].props.src : tempString;
      // Adding for edge cases like microbits, where they wrap the iframe around a div
      if (ReactHtmlParser(tempString)[0].props) {
        if (ReactHtmlParser(tempString)[0].props.children) {
          ReactHtmlParser(tempString)[0].props.children.forEach((child) => {
            src = (child.props && child.type === 'iframe') ? child.props.src : src;
          });
        }
      }
      src = src
        .replace(/[\u2018\u2019]/g, '')
        .replace(/[\u201C\u201D]/g, '');
      this.props.setIframeURL(this.props.id, src);
      event.preventDefault();
    };
  }

  render() {
    return (
      <div data-test="iframe__container">
        <div className="element__iframe">
          <iframe
            className="iframe__main"
            title="embedded webpage"
            src={this.props.iframeURL}
            data-test="iframe__main"
          />
        </div>
        <form className="element__add-url" onSubmit={this.urlSubmitted.bind(this)}>
          <label htmlFor="element-name" className="element__label">
            URL
            <input
              id="element-name"
              className="element__input"
              data-test="iframe__input"
              type="text"
              ref={(element) => { this.url = element; }}
              defaultValue={this.props.iframeURL}
              readOnly={this.props.preview}
            />
          </label>
          <input
            className="element__button"
            type="submit"
            data-test="iframe__submit"
            value="Submit"
          />
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

function mapStateToProps(state) {
  return {
    preview: state.page.preview
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setIframeURL
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Iframe);
