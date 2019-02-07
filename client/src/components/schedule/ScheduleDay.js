import React from 'react';
import classNames from 'classnames';

class ScheduleDay extends React.Component{
  render(){

    const {
      day,
      time,
      description,
      currentDay,
    } = this.props;

    const containerName= classNames(
      'schedule__container',
      {
        'schedule__container--selected': currentDay,
      }
    );

    return(
      <div className={containerName}>
        <div className="misc_title">
          {day}
        </div>
        {time}
        <br/>
        {description}
      </div>
    );
  }
}

export default ScheduleDay;