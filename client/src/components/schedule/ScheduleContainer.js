import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Scrollbar from 'smooth-scrollbar';
import FontAwesome from 'react-fontawesome';
import PanelWrapper from 'components/PanelWrapper';

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

    /* already checked to make sure schedule[0] exists in wrapper */
    return(
      <div id="schedule_wrapper">
        <div className="twitch_header">
          <FontAwesome name="calendar"/>
          &nbsp;Schedule
        </div>

        <div className="schedule__wrapper">
          <div className="schedule__container">
            <div className="misc_title">
            Monday
            </div>
            {schedules[0].value.monTime}
            <br/>
            {schedules[0].value.monDescription}
          </div>

          <div className="schedule__container">
            <div className="misc_title">
            Tuesday
            </div>
            {schedules[0].value.tuesTime}
            <br/>
            {schedules[0].value.tuesDescription}
          </div>

          <div className="schedule__container">
            <div className="misc_title">
            Wednesday
            </div>
            {schedules[0].value.wedTime}
            <br/>
            {schedules[0].value.wedDescription}
          </div>

          <div className="schedule__container">
            <div className="misc_title">
            Thursday
            </div>
            {schedules[0].value.thursTime}
            <br/>
            {schedules[0].value.thursDescription}
          </div>

          <div className="schedule__container">
            <div className="misc_title">
            Friday
            </div>
            {schedules[0].value.friTime}
            <br/>
            {schedules[0].value.friDescription}
          </div>

          <div className="schedule__container">
            <div className="misc_title">
            Saturday
            </div>
            {schedules[0].value.satTime}
            <br/>
            {schedules[0].value.satDescription}
          </div>

          <div className="schedule__container">
            <div className="misc_title">
            Sunday
            </div>
            {schedules[0].value.sunTime}
            <br/>
            {schedules[0].value.sunDescription}
          </div>
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