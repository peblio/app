import React, { PropTypes } from 'react';

class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus=this.onFocus.bind(this);
  }
  onFocus() {
    this.props.setCurrentIframe(this.props.id);
  }
  urlSubmitted(event) {
    this.props.setIframeURL(this.url.value);
    event.preventDefault();
  }
  render() {
    let dragClassName="element__close drag__" +this.props.id;
    return (
      <div className="element__iframe" id={this.props.id} onFocus={this.onFocus}>
        <nav>
          <button className="element__close" onClick={()=> this.props.removeIframe(this.props.id)}>&#x2613;</button>
          <button className={dragClassName}>&#x2612;</button>
        </nav>
        <div>
          <iframe src={this.props.iframeURL}/>
        </div>
        <form className="element__addURL" onSubmit={(event)=> {this.urlSubmitted(event)}}>
          <label className="element__label"> URL
            <input className="element__input" type="text" ref={(element)=> { this.url=element; }}  defaultValue={this.props.iframeURL}/>
          </label>
          <input className="element__button" type='submit' value='Submit'/>
        </form>

      </div>
    );
  }

}


export default Iframe;
