import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './datePickerField.scss';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DatePickerField = ({ state, setState, label, containerWidth }) => {
  const [pickerTriggered, setPickerTriggered] = useState(false);

  return (
    <div className="date-picker-field">
      { label && (
        <div className="date-picker-field__label">
          {label}
        </div>
      )}
      <div
        className={`date-picker-field__input-container ${pickerTriggered ? 'focused' : ''}`}
        style={{ width: containerWidth }}
      >
        <input
          value={moment(state).format('MM/DD/YYYY')}
          className="date-picker-field__input-container__input"
          placeholder="mm/dd/yy"
          onFocus={() => { setPickerTriggered(true); }}
        />
        <span className="date-picker-field__input-container__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z" fill="black" />
          </svg>
        </span>
      </div>
      {
        pickerTriggered && (
          <div className="date-picker-field__calender-container">
            <Calendar
              onChange={(d) => {
                setState(d);
                setPickerTriggered(() => false);
              }}
              value={state}
            />
          </div>
        )
      }
    </div>
  );
};

DatePickerField.propTypes = {
  state: PropTypes.instanceOf(Date).isRequired,
  setState: PropTypes.func.isRequired,
  label: PropTypes.string,
  containerWidth: PropTypes.string.isRequired
};

DatePickerField.defaultProps = {
  label: ''
};

export default DatePickerField;
