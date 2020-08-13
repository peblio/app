import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './datePickerField.scss';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import CalendarIcon from '../../images/calendar.svg';

const DatePickerField = ({ state, setState, label, containerWidth }) => {
  const [pickerTriggered, setPickerTriggered] = useState(false);
  const outsideClickListener = (e) => {
    if (
      e.target.parentNode.className &&
      e.target.parentNode.className.split(' ').includes('react-calendar__month-view__days__day') ||
      e.target.className.split(' ').includes('react-calendar__month-view__days__day')
    ){
      setTimeout(() => {
        document.removeEventListener('click', outsideClickListener);
      }, 0);
    }
    else if (!e.target.parentNode.className || !e.target.parentNode.className.split('__').includes('react-calendar')) {
      setPickerTriggered(() => false);
      setTimeout(() => {
        document.removeEventListener('click', outsideClickListener);
      }, 0);
    }
  }

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
          onChange={() => {}}
          placeholder="mm/dd/yy"
          onClick={() => { 
            setPickerTriggered(true);
            setTimeout(()=>{
              document.addEventListener('click',outsideClickListener)
            }, 100);
          }}
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
