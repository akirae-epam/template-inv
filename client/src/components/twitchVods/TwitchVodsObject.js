import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as lionActions from 'actions/lion';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';

class TwitchObject extends React.Component{

  secondsToHms = (seconds) => {
    seconds = Number(seconds);
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);

    let hDisplay = h > 0 ? (h >= 10 ? '' : '0') + h : '00';
    let mDisplay = m > 0 ?  (m >= 10 ? '' : '0') + m : '00';
    let sDisplay = s > 0 ? (s >= 10 ? '' : '0') + s : '00';
    return hDisplay +':'+ mDisplay +':'+ sDisplay;
  };

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){
    const {
      title,
      url,
      views,
      preview,
      created_at,
      length,
      game,
    } = this.props;

    let timeText = moment(created_at).fromNow();
    return(
      <div className="twitch_object">
        <div className="twitch_image__wrapper">
          <Link to={siteRoutes.twitchVodSingle + '/' + url.slice(29)}>
            <img
              src={preview}
              alt="title"
              className="twitch_image"
              onMouseEnter={()=>this.toggleSmile(true)}
              onMouseLeave={()=>this.toggleSmile(false)}
            />
          </Link>
        </div>
        <Link
          to={siteRoutes.twitchVodSingle + '/' + url.slice(29)}
          onMouseEnter={()=>this.toggleSmile(true)}
          onMouseLeave={()=>this.toggleSmile(false)}
        >
          <strong>
            {title}
          </strong>
        </Link>
        <div className="twitch_subtext">
          <div className="twitch_subtext__half">
            {timeText}
            <br/>
            {views}&nbsp;views
          </div>
          <div className="twitch_subtext__half">
            {this.secondsToHms(length)}
            <br/>
            {game}
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
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(TwitchObject);