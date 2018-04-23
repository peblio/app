import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.setCurrentEditor = () => { this.props.setCurrentEditor(this.props.id); };
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.updateAnswerChange = (event) => {
      this.props.updateAnswerChange(this.props.id, event.target.value);
    };
    this.updateQuestionChange = (event) => {
      this.props.updateQuestionChange(this.props.id, event.target.value);
    };
  }

  componentDidUpdate() {
    console.log('boo');
    $('.question__question').on('change keyup keydown paste cut', 'textarea', function () {
      $(this).height(0).height(this.scrollHeight);
    }).find('textarea').change();
  }

  render() {
    return (
      <div>
        <section className="question__container">
          <textarea
            className="question__question"
            onChange={this.updateQuestionChange}
            value={this.props.question}
            readOnly={this.props.preview}
          >
          </textarea>
          <textarea
            className="question__answer"
            onChange={this.updateAnswerChange}
            value={this.props.answer}
          >
          </textarea>
        </section>
      </div>
    );
  }
}

Questions.propTypes = {
  id: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  updateAnswerChange: PropTypes.func.isRequired,
  updateQuestionChange: PropTypes.func.isRequired
};

export default Questions;
