import React from 'react';
import {connect} from 'react-redux';
import PanelWrapper from 'components/PanelWrapper';
import ScheduleContainer from 'components/schedule/ScheduleContainer';

import {
  selectSchedules,
} from 'reducers';

class ScheduleWrapper extends React.Component{

  render(){

    const {
      schedules,
    } = this.props;

    return(
      <PanelWrapper>
        {(schedules[0] && schedules[0].value) ?
          <ScheduleContainer/>
          :
          null}
      </PanelWrapper>
    );
  }
}

export default connect(
  (state) => ({
    schedules: selectSchedules(state),
  }),
  dispatch => ({
  }),
)(ScheduleWrapper);