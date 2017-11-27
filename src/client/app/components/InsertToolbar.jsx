import React from 'react';
import { render } from 'react-dom';

class InsertToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='insertToolbar__container'>
        <button
          onClick = {this.props.addEditor}
          className = 'insertToolbar__button'
        >


          <svg className='insertToolbar__icon' width="31px" height="16px" viewBox="0 0 31 16" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Shape" transform="translate(-53.000000, -64.000000)" stroke="#FFFFFF">
                    <rect id="Shape" id="Rectangle-25" x="53.5" y="66.5" width="30" height="13"></rect>
                    <rect id="Shape" id="Rectangle-25-Copy-2" x="70.5" y="66.5" width="13" height="13"></rect>
                    <rect id="Shape" id="Rectangle-25-Copy" x="53.5" y="64.5" width="7" height="2"></rect>
                </g>
            </g>
          </svg>

          editor
        </button>
        <button
          onClick = {this.props.addTextEditor}
          id="elementButton" className = 'insertToolbar__button'
        >
        <svg className='insertToolbar__icon' width="18px" height="16px" viewBox="0 0 16 17" version="1.1" >
            <g strokeWidth="1" fill="#FFFFFF" fillRule="evenodd">
                <path id="Shape" d="M0,4.04645536 L0,0 L13.9772359,0 L13.9772359,4.04645536 L12.915891,4.04645536 C13.115877,2.81346441 12.8883919,2.04209731 12.2334355,1.73235404 C10.5403701,0.931666166 8.87934339,1.43977424 8.87934339,1.44193215 C8.87934339,4.61161368 8.87934339,9.03300018 8.87934339,14.7060916 C8.95680425,15.6533212 9.69926019,16.1269359 11.1067112,16.1269359 C11.1067112,16.1269359 11.1067112,16.4179573 11.1067112,17 L2.92855622,17 L2.92855622,16.1269359 C4.28070183,16.1269359 4.95677464,15.7036888 4.95677464,14.8571945 C4.95677464,14.0107003 4.95677464,9.53894617 4.95677464,1.44193215 C3.60498302,1.21210438 2.58284964,1.36557038 1.8903745,1.90233014 C0.994928392,2.59641923 1.10095141,4.04645536 1.05590481,4.04645536 C1.02587375,4.04645536 0.673905479,4.04645536 0,4.04645536 Z"></path>
            </g>
        </svg>

          text box
        </button>
        <button
          onClick = {this.props.addIframe}
          className = 'insertToolbar__button'
        >

            <svg className='insertToolbar__icon' width="20px" height="16px" viewBox="0 0 20 16">
            <g strokeWidth="1" fill="none" fillRule="evenodd">
                  <g fillRule="nonzero" fill="#FFFFFF">
                      <polygon id="Shape" points="5.7 5.2 5 4.4 4.3 3.7 0.9 7.1 0 8 4.3 12.2 5 11.5 5.7 10.8 3.9 9 2.9 8 3.9 7"></polygon>
                      <polygon id="Shape" points="15 4.4 14.3 5.2 16.1 7 17.1 8 16.1 9 14.3 10.8 15 11.5 15.7 12.2 19.1 8.8 20 8 15.7 3.7"></polygon>
                      <rect id="Shape" transform="translate(10.000300, 8.001600) rotate(-164.079003) translate(-10.000300, -8.001600) " x="9.00034248" y="0.701910074" width="1.99991505" height="14.5993799"></rect>
                  </g>
              </g>
            </svg>

          embed
        </button>
      </div>
    );
  }

}

export default InsertToolbar;
