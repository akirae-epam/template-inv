import React from 'react';
import { connect } from 'react-redux';
import ScheduleForm from 'admin/forms/ScheduleForm';
import * as scheduleActions from 'actions/schedule';
import { bindActionCreators } from 'redux';
import {siteRoutes} from 'data/siteRoutes';

class ScheduleAdd extends React.Component {
  addSchedule = values => {
    this.props.scheduleActions.postScheduleThenUpdate(values, siteRoutes.adminScheduleView);
  }
  render(){
    return (
      <div>
        <div className="admin_container">
          <div className="admin_title">
            Add Schedule
          </div>
          <div className="admin_container__body">
            <ScheduleForm onSubmit={this.addSchedule}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({

  }),
  dispatch => ({
    scheduleActions: bindActionCreators(scheduleActions, dispatch),
  }),
)(ScheduleAdd);
