import React from 'react';
import io from "socket.io-client";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as twitchActions from 'actions/twitch';

class SocketFetch extends React.Component {
  constructor(props){
    super(props);
    this.socket = io();
}
  componentDidMount() {
    this.socket.on('twitchLive', function(res){
      this.props.twitchActions.setLive({
        username: res.username,
        isLive: res.isLive,
      })
    }.bind(this));
  }

  render() {
    return null;
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    twitchActions: bindActionCreators(twitchActions, dispatch),
  }),
)(SocketFetch);