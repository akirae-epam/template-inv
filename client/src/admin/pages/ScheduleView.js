import React from 'react';
import { connect } from 'react-redux';
import SchedulesView from 'admin/components/SchedulesView';

class ViewSchedule extends React.Component {

  render(){
    return (
      <div>
        <div className="admin_container">
          <div className="admin_title">
            View Schedule
          </div>
          <div className="admin_container__body">
            <SchedulesView/>
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

  }),
)(ViewSchedule);
