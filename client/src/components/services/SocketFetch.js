import React from 'react';
import io from "socket.io-client";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as twitchActions from 'actions/twitch';
import * as twitterActions from 'actions/twitter';

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

    this.socket.on('twitterData', function(res){
      this.props.twitterActions.fetchTwitter(res.data)
    }.bind(this));

    this.socket.on('twitchVods', function(res){
      this.props.twitchActions.fetchTwitchVods(res.data)
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
    twitterActions: bindActionCreators(twitterActions, dispatch),
  }),
)(SocketFetch);