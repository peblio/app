import React from 'react';
import PropTypes from 'prop-types';

require('./pebls.scss');

class Pebls extends React.Component {
  componentDidMount() {
  }

  renderPebls() {
    return this.props.pebls.map((pebl) => {
      const link = `/pebl/${pebl.id}`;
      const iframeLink = window.location.origin + link;
      return (
          <li className="pebls__file" key={pebl.id}>
            <a className="pebls__link" href={link}>
              <div className="pebls__wrap">
                <iframe
                  className="pebls__iframe"
                ></iframe>
              </div>
              <p className="pebls__title">{pebl.title} </p>
            </a>
          </li>
      );
    });
  }

  render() {
    const Pebls = this.renderPebls();
    return (
      <div className="pebls__content">
        <div className="pebls__heading">
          <p> All Work </p>
        </div>

        <div className="pebls__subheading">
          <p> FOLDERS </p>
        </div>
        <div className="pebls__subheading">
          <p> FILES </p>
        </div>
        <ol className="pebls__files">
          {Pebls}
        </ol>
      </div>
    );
  }
}

Pebls.propTypes = {
  deletePage: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchAllPages: PropTypes.func.isRequired
};

export default Pebls;
