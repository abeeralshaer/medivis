import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar } from './calendar';
import moment from 'moment';
import cx from 'classnames';
import classes from './styles.scss'

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
          <div className={this.state.date.format('DD') === day.format('DD') ? classes.selectedTime : classes.notSelectedTime}>
          <div
            key={day.format()}
            className={classes.cell}
            onClick={e => onPickDate(day)}
          >
            {day.format('D')}
          </div>
          </div>
        )}
        renderHeader={({ date, onPrevMonth, onNextMonth }) => (
          <div className={classes.header}>
            <div className={classes.arrowLeft} onClick={onPrevMonth}/>
            <div className="Calendar-header-currentDate">
              {date.format('MMMM YYYY')}
            </div>
            <div className={classes.arrowRight} onClick={onNextMonth}/>
          </div>
        )}
      />
    );
  }
}

export default CalendarExample
