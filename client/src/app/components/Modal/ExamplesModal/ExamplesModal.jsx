import React from 'react';

import axios from '../../../utils/axios';

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
    axios.get('/api/examples')
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
        <li key={page.id}>
          <a href={link}> {page.title} </a>
        </li>
      );
    });
    return pages;
  }

  render() {
    const Pages = this.renderPages();
    return (
      <div className="pages_list">
        <p className="pages_title">Title</p>
        <ol>
          {Pages}
        </ol>
      </div>
    );
  }
}

export default ExamplesModal;
