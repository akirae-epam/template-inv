import React from 'react';
import SchedulesView from 'admin/components/SchedulesView';

class ViewSchedule extends React.Component {
  render(){
    return (
      <div className="admin_container">
        <div className="admin_title">
          View Schedule
        </div>
        <div className="admin_container__body">
          <SchedulesView/>
        </div>
      </div>
    );
  }
}

export default ViewSchedule;