import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Scrollbar from 'smooth-scrollbar';
import FontAwesome from 'react-fontawesome';
import ScheduleDay from 'components/schedule/ScheduleDay';

import * as lionActions from 'actions/lion';

import {
  selectSchedules,
} from 'reducers';

class TwitchVodsContainer extends React.Component{

  componentDidMount() {
    const scrollbar = Scrollbar.init(document.querySelector('#schedule_wrapper'), {
      alwaysShowTracks: true,
    });
    this.scrollbar = scrollbar;

    setTimeout(this.scrollbar.update(), 1000);
  }

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){

    const {
      schedules,
    } = this.props;

    let dt = new Date();
    let currentDay = dt.getDay();

    const scheduleArray = [
      {day: 'Monday', time: schedules[0].value.monTime, description: schedules[0].value.monDescription, currentDay: currentDay === 1},
      {day: 'Tuesday', time: schedules[0].value.tuesTime, description: schedules[0].value.tuesDescription, currentDay: currentDay === 2},
      {day: 'Wednesday', time: schedules[0].value.wedTime, description: schedules[0].value.wedDescription, currentDay: currentDay === 3},
      {day: 'Thursday', time: schedules[0].value.thursTime, description: schedules[0].value.thursDescription, currentDay: currentDay === 4},
      {day: 'Friday', time: schedules[0].value.friTime, description: schedules[0].value.friDescription, currentDay: currentDay === 5},
      {day: 'Saturday', time: schedules[0].value.satTime, description: schedules[0].value.satDescription, currentDay: currentDay === 6},
      {day: 'Sunday', time: schedules[0].value.sunTime, description: schedules[0].value.sunDescription, currentDay: currentDay === 0},
    ];

    /* already checked to make sure schedule[0] exists in wrapper */
    return(
      <div id="schedule_wrapper">
        <div className="twitch_header">
          <FontAwesome name="calendar"/>
          &nbsp;Schedule
        </div>
        <div className="schedule__wrapper">

          {scheduleArray.map((value, key) => {
            return (
              <ScheduleDay
                key={key}
                day={value.day}
                time={value.time}
                description={value.description}
                currentDay = {value.currentDay}
              />
            );
          })}

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    schedules: selectSchedules(state),
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(TwitchVodsContainer);