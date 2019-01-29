import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import SocialLogo from 'social-logos';

class TwitchObject extends React.Component{
  render(){
    const {
      title,
      url,
      views,
      preview,
      created_at,
    } = this.props;

    let timeText = moment(created_at).fromNow();

    return(
      <div className="twitter_object">
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={preview} alt="title" className="twitch_image"/>
        </a>
          <strong>
            {title}
          </strong>
          <br/>
          {timeText}
          <br/>
          {views} views

      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
  }),
)(TwitchObject);