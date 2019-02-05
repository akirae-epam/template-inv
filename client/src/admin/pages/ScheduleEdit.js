import React from 'react';
import { connect } from 'react-redux';
import ScheduleEditForm from 'admin/forms/ScheduleEditForm';
import * as scheduleActions from 'actions/schedule';
import { bindActionCreators } from 'redux';
import {siteRoutes} from 'data/siteRoutes';

class ScheduleEdit extends React.Component {
  editSchedule = values => {
    this.props.scheduleActions.putScheduleThenUpdate(values, siteRoutes.adminScheduleView);
  }
  render(){
    return (
      <div>
        <div className="admin_container">
          <div className="admin_title">
            Edit Schedule
          </div>
          <div className="admin_container__body">
            <ScheduleEditForm
              id={this.props.match.params.id}
              onSubmit={this.editSchedule}
            />
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
)(ScheduleEdit);
