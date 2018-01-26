import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar } from 'react-calendar-component';
import moment from 'moment';
import cx from 'classnames';
import 'moment/locale/nb';
import classes from './style.scss'

class CalendarExample extends Component {
  state = {
    date: moment()
  };

  render() {
    return (
      <Calendar
        onChangeMonth={date => this.setState({ date })}
        date={this.state.date}
        onPickDate={date => console.log(date)}
        renderDay={({ day, classNames, onPickDate }) => (
          <div
            key={day.format()}
            className={cx(
              'Calendar-grid-item',
              day.isSame(moment(), 'day') && 'Calendar-grid-item--current',
              classNames
            )}
            onClick={e => onPickDate(day)}
          >
            {day.format('D')}
          </div>
        )}
        renderHeader={({ date, onPrevMonth, onNextMonth }) => (
          <div className="Calendar-header">
            <button onClick={onPrevMonth}>«</button>
            <div className="Calendar-header-currentDate">
              {date.format('MMMM YYYY')}
            </div>
            <button onClick={onNextMonth}>»</button>
          </div>
        )}
      />
    );
  }
}

export default CalendarExample
