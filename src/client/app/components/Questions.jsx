import React from 'react';
import PropTypes from 'prop-types';
import DragSVG from '../images/drag.svg';
import CloseSVG from '../images/close.svg';

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

  test(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div id={this.props.id} className="question__main-container">
        { this.props.preview ||
          <nav>
            <button className="element__close" onClick={this.removeEditor.bind(this)}>
              <CloseSVG alt="close element" />
            </button>
            <button className={`element__close drag__${this.props.id}`}><DragSVG alt="drag element" /></button>
          </nav>
        }
        <section className="question__container">
          <textarea className="question__question" onChange={this.updateQuestionChange} defaultValue="Question" value={this.props.question}></textarea>
          <textarea className="question__answer" onChange={this.updateAnswerChange} defaultValue="This is an answer" value={this.props.answer}></textarea>
        </section>
      </div>
    );
  }
}

Questions.propTypes = {
  id: PropTypes.string.isRequired,
  // editorState: PropTypes.shape.isRequired,
  // onChange: PropTypes.func.isRequired,
  // preview: PropTypes.bool.isRequired,
  // setCurrentEditor: PropTypes.func.isRequired,
  // removeEditor: PropTypes.func.isRequired
};

export default Questions;
