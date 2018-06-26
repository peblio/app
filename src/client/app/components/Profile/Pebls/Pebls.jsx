import React from 'react';
import PropTypes from 'prop-types';

require('./pebls.scss');

class Pebls extends React.Component {
  componentDidMount() {
  }

  renderPebls() {
    return this.props.pebls.map((pebl) => {
      console.log(pebl.id);
      console.log(pebl.title);
      const link = `/pebl/${pebl.id}`;
      const iframeLink = window.location.origin + link;
      return (
        <li key={pebl.id}>
          <a href={link}>
            <div className="pebls__wrap">
              <iframe
                className="pebls__iframe"

              ></iframe>
            </div>
            <h2 className="pebls__title">{pebl.title} </h2>
          </a>
        </li>
      );
    });
  }

  render() {
    const Pebls = this.renderPebls();
    return (
      <div>
        <ol className="pebls__list">
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
