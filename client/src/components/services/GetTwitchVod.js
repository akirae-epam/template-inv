import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as twitchActions from 'actions/twitch';

class GetTwitchVod extends React.Component{

  componentDidMount(){
    let id = this.props.match.params.id;
    this.props.twitchActions.setTwitchVod(id);
  }

  render(){
    return null;
  }
}
export default connect(
  () => ({
  }),
  dispatch => ({
    twitchActions: bindActionCreators(twitchActions, dispatch),
  }),

)(GetTwitchVod);