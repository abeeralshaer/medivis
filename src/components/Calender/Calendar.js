import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import cx from 'classnames';
import createDateObjects from './createDateObjects';
import classes from './styles.scss';

export default class Calendar extends Component {
  static propTypes = {
    /** Week offset*/
    weekOffset: PropTypes.number.isRequired,
    /** The current date as a moment objecct */
    date: PropTypes.object.isRequired,
    /** Function to render a day cell */
    renderDay: PropTypes.func,
    /** Function to render the header */
    renderHeader: PropTypes.func,
    /** Called on next month click */
    onNextMonth: PropTypes.func,
    /** Called on prev month click */
    onPrevMonth: PropTypes.func,
    /** Called when some of the navigation controls are clicked */
    onChangeMonth: PropTypes.func,
    /** Called when a date is clicked */
    onPickDate: PropTypes.func,
    /** classname for div wrapping the whole calendar */
    containerClassName: PropTypes.string,
    /** classname for the div wrapping the grid */
    contentClassName: PropTypes.string
  };

  static defaultProps = {
    weekOffset: 0,
    renderDay: ({ day, classNames, onPickDate }) => (
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
    ),
    renderHeader: ({ date, onPrevMonth, onNextMonth }) => (
      <div className="Calendar-header">
        <button onClick={onPrevMonth}>«</button>
        <div className="Calendar-header-currentDate">
          {date.format('MMMM YYYY')}
        </div>
        <button onClick={onNextMonth}>»</button>
      </div>
    )
  };

  handleNextMonth = () => {
    if (this.props.onNextMonth) {
      return this.props.onNextMonth();
    }

    this.props.onChangeMonth(this.props.date.clone().add(1, 'months'));
  };

  handlePrevMonth = () => {
    if (this.props.onPrevMonth) {
      return this.props.onPrevMonth();
    }

    this.props.onChangeMonth(this.props.date.clone().subtract(1, 'months'));
  };

  render() {
    const {
      date,
      weekOffset,
      renderDay,
      renderHeader,
      onPickDate,
      contentClassName,
      containerClassName
    } = this.props;

    return (
      <div className={classes.calendar}>
        {renderHeader({
          date,
          onPrevMonth: this.handlePrevMonth,
          onNextMonth: this.handleNextMonth
        })}
        <div className={classes.row}>
          {createDateObjects(date, weekOffset).map((day, i) =>{
            if(i < 7) {
            return  (

              renderDay({ ...day, onPickDate })

            )
            }}
          )}
        </div>
        <div className={classes.row}>
          {createDateObjects(date, weekOffset).map((day, i) =>{
            if(i > 6 && i < 14){
            return  renderDay({ ...day, onPickDate })
            }}
          )}
        </div>
        <div className={classes.row}>
          {createDateObjects(date, weekOffset).map((day, i) =>{
            if( i > 13 && i < 21){
          return  renderDay({ ...day, onPickDate })}}
          )}
        </div>
        <div className={classes.row}>
          {createDateObjects(date, weekOffset).map((day, i) =>{
            if( i > 20 && i < 28) {
              return renderDay({ ...day, onPickDate })
            }}
          )}
        </div>
      </div>
    );
  }
}
