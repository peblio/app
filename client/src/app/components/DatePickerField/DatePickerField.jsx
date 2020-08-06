import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './datePickerField.scss';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import CalendarIcon from '../../images/calendar.svg';

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
          value={state ? moment(state).format('MM/DD/YYYY') : ''}
          className="date-picker-field__input-container__input"
          placeholder="mm/dd/yy"
          onFocus={() => { setPickerTriggered(true); }}
        />
        <span className="date-picker-field__input-container__icon">
          <CalendarIcon />
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
