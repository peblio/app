import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './datePickerField.scss';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import CalendarIcon from '../../images/calendar.svg';

const DatePickerField = ({ state, setState, label, containerWidth, calendarPosition }) => {
  const [pickerTriggered, setPickerTriggered] = useState(false);
  const outsideClickListener = (e) => {
    if (
      e.target.parentNode.className
        ? (e.target.parentNode.className.split(' ').includes('react-calendar__month-view__days__day') ||
      e.target.className.split(' ').includes('react-calendar__month-view__days__day') ||
      e.target.className.split('__').includes('date-picker-field')
        )
        : false
    ) {
      setTimeout(() => {
        document.removeEventListener('click', outsideClickListener);
      }, 0);
    } else if (!e.target.parentNode.className ||
      !e.target.parentNode.className.split('__').includes('react-calendar')) {
      setPickerTriggered(() => false);
      setTimeout(() => {
        document.removeEventListener('click', outsideClickListener);
      }, 0);
    }
  };

  useEffect(() => () => {
    document.removeEventListener('click', outsideClickListener);
  }, []);

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
          onKeyDown={(e) => { if (e.key === 'Backspace') { setState(null); } }}
          placeholder="mm/dd/yy"
          onClick={() => {
            if (!pickerTriggered) {
              setTimeout(() => {
                document.addEventListener('click', outsideClickListener);
              }, 100);
            }
            setPickerTriggered(val => !val);
          }}
        />
        <span className="date-picker-field__input-container__icon">
          <CalendarIcon />
        </span>
      </div>
      {
        pickerTriggered && (
          <div className={`date-picker-field__calendar-container ${calendarPosition || ''}`}>
            <Calendar
              onChange={(d) => {
                setState(d);
                setPickerTriggered(() => false);
              }}
              value={new Date(state)}
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
  containerWidth: PropTypes.string,
  calendarPosition: PropTypes.string
};

DatePickerField.defaultProps = {
  label: '',
  containerWidth: '',
  calendarPosition: 'left'
};

export default DatePickerField;
