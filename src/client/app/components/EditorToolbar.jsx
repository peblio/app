import React from 'react';
import { render } from 'react-dom';

class EditorToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="editorToolbar__container">
        <select
          className="editorToolbar__item"
          id="test"
          onChange={(event) => {this.props.setEditorMode(event.target.value)}}
        >
          <option value="p5">p5</option>
          <option value="javascript">javascript</option>
          <option value="python">python</option>
        </select>
        <button
          className="editorToolbar__svg"
          onClick = {this.props.playCode}
        >
        <svg width="11px" height="13px" viewBox="0 0 11 13" version="1.1">
            <g id="playPause" stroke="none" strokeWidth="1" fill="#F7F7F7" fillRule="evenodd">
                <g transform="translate(-753.000000, -299.000000)">
                    <path d="M763.367886,303.973892 L754.787717,299.153987 L754.787717,299.153987 C754.209902,298.8294 753.478361,299.034682 753.153774,299.612497 C753.052955,299.79197 753,299.994361 753,300.200213 L753,309.840022 L753,309.840022 C753,310.502763 753.537258,311.040022 754.2,311.040022 C754.405852,311.040022 754.608243,310.987067 754.787717,310.886248 L763.367886,306.066344 L763.367886,306.066344 C763.945701,305.741757 764.150982,305.010216 763.826395,304.432401 C763.71853,304.240385 763.559902,304.081757 763.367886,303.973892 Z" id="Triangle"></path>
                </g>
            </g>
          </svg>

        </button>
        <button
          className="editorToolbar__svg"
          onClick = {this.props.stopCode}
        >
            <svg width="11px" height="12px" viewBox="0 0 11 12" version="1.1">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="playPause"  transform="translate(-774.000000, -299.000000)" fill="#F7F7F7">
                      <g transform="translate(774.000000, 299.000000)">
                          <rect x="0" y="0" width="4.2" height="12" rx="1.2"></rect>
                          <rect x="6.6" y="0" width="4.2" height="12" rx="1.2"></rect>
                      </g>
                  </g>
              </g>
            </svg>
        </button>
      </div>
    );
  }

}

export default EditorToolbar;
