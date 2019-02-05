import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from 'actions/schedule';

class GetSchedule extends React.Component {
  componentDidMount() {
    this.props.scheduleActions.fetchSchedule();
  }
  render() {
    return null;
  }
}

export default connect(
  () => ({
  }),
  dispatch => ({
    scheduleActions: bindActionCreators(scheduleActions, dispatch),
  }),
)(GetSchedule);
