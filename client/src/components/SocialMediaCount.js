import React from 'react';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import * as lionActions from 'actions/lion';
import {bindActionCreators} from 'redux';

import {
  selectTwitterFollowerCountThousands,
  selectTwitchFollowerCountThousands,
  selectInstagramFollowerCountThousands,
} from 'reducers';

let twitterName = '';
let twitchName = '';
let instagramName = '';
let json = require('config.json');
twitterName = json.twitterName;
twitchName = json.twitchName;
instagramName = json.instagramName;

class SocialMediaCount extends React.Component{

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){
    const {
      twitterFollowerCount,
      twitchFollowerCount,
      instagramFollowerCount,
    } = this.props;

    return(
      <div className="social_count__wrapper">
        <a
          href={'https://twitter.com/'+twitterName}
          target="_blank"
          rel="noopener noreferrer"
          className="twitter_object__action"
        >
          <div
            className="social_count__container"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}
          >
            <div className="social_count_twitter">
              <FontAwesome name="twitter"/>
            </div>
            <div className="social_count__text">
              {twitterFollowerCount}
            </div>
          </div>
        </a>

        <a
          href={'https://twitch.tv/'+twitchName}
          target="_blank"
          rel="noopener noreferrer"
          className="twitter_object__action"
        >
          <div
            className="social_count__container"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}
          >
            <div className="social_count_twitter">
              <FontAwesome name="twitch"/>
            </div>
            <div className="social_count__text">
              {twitchFollowerCount}
            </div>
          </div>
        </a>

        <a
          href={'https://instagram.com/'+instagramName}
          target="_blank"
          rel="noopener noreferrer"
          className="twitter_object__action"
        >
          <div
            className="social_count__container"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}
          >
            <div className="social_count_twitter">
              <FontAwesome name="instagram"/>
            </div>
            <div className="social_count__text">
              {instagramFollowerCount}
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    twitterFollowerCount: selectTwitterFollowerCountThousands(state),
    twitchFollowerCount: selectTwitchFollowerCountThousands(state),
    instagramFollowerCount: selectInstagramFollowerCountThousands(state),
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(SocialMediaCount);