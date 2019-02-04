import React from 'react';
import io from 'socket.io-client';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as twitchActions from 'actions/twitch';
import * as twitterActions from 'actions/twitter';
import * as instagramActions from 'actions/instagram';
import * as youtubeActions from 'actions/youtube';

class SocketFetch extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint);

    socket.on('socialMediaData', function(res){
      if (res) {
        this.props.twitchActions.setLive(res.isLive);
        this.props.twitterActions.fetchTwitter(res.twitterData);
        this.props.twitterActions.fetchTwitterFollowerCount(res.twitterFollowers);
        this.props.twitchActions.fetchTwitchVods(res.twitchVodData);
        this.props.twitchActions.fetchTwitchFollowerCount(res.twitchFollowers);
        this.props.instagramActions.fetchInstagramFollowerCount(res.instagramFollowers);
        this.props.youtubeActions.fetchYoutubeFollowerCount(res.youtubeFollowers);
      }
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
    instagramActions: bindActionCreators(instagramActions, dispatch),
    youtubeActions: bindActionCreators(youtubeActions, dispatch),
  }),
)(SocketFetch);