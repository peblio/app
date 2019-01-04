import React from 'react';
import axios from '../../../../utils/axios';

require('./examplesModal.scss');

class ExamplesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examples: []
    };
    this.renderPages = this.renderPages.bind(this);
  }

  componentDidMount() {
    const temp = [];
    axios.get('/pages/examples')
      .then((res) => {
        res.data.forEach((example) => {
          temp.push({
            id: example.id,
            title: example.title
          });
        });
        this.setState({ examples: temp });
      });
  }

  renderPages() {
    const pages = [];
    this.state.examples.forEach((page, index) => {
      const link = `/pebl/${page.id}`;
      pages.push(
        <li
          className="examples__list-item"
          key={page.id}
          data-test="examples__title"
        >
          <a
            className="examples__link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {page.title}
          </a>
        </li>
      );
    });
    return pages;
  }

  render() {
    const Pages = this.renderPages();
    return (
      <div className="examples__container">
        <h1 className="examples__heading">
          Examples
        </h1>
        <p className="examples__title">Title</p>
        <ul className="examples__list-items">
          {Pages}
        </ul>
      </div>
    );
  }
}

export default ExamplesModal;
