import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as lionActions from 'actions/lion';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';

class TwitchObject extends React.Component{

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
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(TwitchObject);