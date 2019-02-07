import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';

import {
  selectSchedules,
} from 'reducers';

const ScheduleList = ({schedules}) => {
  if (schedules.length > 2) {
    schedules.map((value, key) => {
      return (
        <div className="misc_image__container" key={key}>
          <div className="misc_title">
          Monday
          </div>
          {value.value.monTime}
          <br/>
          {value.value.monDescription}
          <div className="misc_title">
          Tuesday
          </div>
          {value.value.tuesTime}
          <br/>
          {value.value.tuesDescription}
          <div className="misc_title">
          Wednesday
          </div>
          {value.value.wedTime}
          <br/>
          {value.value.wedDescription}
          <div className="misc_title">
          Thursday
          </div>
          {value.value.thursTime}
          <br/>
          {value.value.thursDescription}
          <div className="misc_title">
          Friday
          </div>
          {value.value.friTime}
          <br/>
          {value.value.friDescription}
          <div className="misc_title">
          Saturday
          </div>
          {value.value.satTime}
          <br/>
          {value.value.satDescription}
          <div className="misc_title">
          Sunday
          </div>
          {value.value.sunTime}
          <br/>
          {value.value.sunDescription}

          <br/>
          <Link to={siteRoutes.adminSchedule+'/'+value.id}>
            Edit Schedule
          </Link>
          <div
            className="admin_delete"
            onClick={()=>this.deleteContent(value.id, value.doc._rev, value.value.awsKey)}
          >
            delete
          </div>
          <br/><br/>
        </div>
      );
    });
  }
  else if (schedules.length === 1) {
    return (
      <div className="misc_image__container">
        <div className="misc_title">
        Monday
        </div>
        {schedules[0].value.monTime}
        <br/>
        {schedules[0].value.monDescription}
        <div className="misc_title">
        Tuesday
        </div>
        {schedules[0].value.tuesTime}
        <br/>
        {schedules[0].value.tuesDescription}
        <div className="misc_title">
        Wednesday
        </div>
        {schedules[0].value.wedTime}
        <br/>
        {schedules[0].value.wedDescription}
        <div className="misc_title">
        Thursday
        </div>
        {schedules[0].value.thursTime}
        <br/>
        {schedules[0].value.thursDescription}
        <div className="misc_title">
        Friday
        </div>
        {schedules[0].value.friTime}
        <br/>
        {schedules[0].value.friDescription}
        <div className="misc_title">
        Saturday
        </div>
        {schedules[0].value.satTime}
        <br/>
        {schedules[0].value.satDescription}
        <div className="misc_title">
        Sunday
        </div>
        {schedules[0].value.sunTime}
        <br/>
        {schedules[0].value.sunDescription}

        <br/>
        <Link to={siteRoutes.adminSchedule+'/'+schedules[0].id}>
          Edit Schedule
        </Link>
        <div
          className="admin_delete"
          onClick={()=>this.deleteContent(schedules[0].id, schedules[0].doc._rev, schedules[0].value.awsKey)}
        >
          delete
        </div>
        <br/><br/>
      </div>
    );
  }
  else {
    return null;
  }
};

class DatabaseList extends Component {

  deleteContent = (id, rev, awsKey) => {
    this.props.imagesActions.removeScheduleThenUpdate(id, rev, awsKey);
  }

  render() {

    const {
      schedules,
    } = this.props;

    return (
      <div className="admin_login_container" onClick={()=>console.log(schedules)}>
        <ScheduleList
          schedules = {schedules}
        />
      </div>
    );
  }
}



export default connect(
  (state) => ({
    schedules: selectSchedules(state),
  }),
  dispatch => ({
  }),
)(DatabaseList);
