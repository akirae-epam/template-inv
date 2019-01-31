import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Scrollbar from 'smooth-scrollbar';
import classNames from 'classnames';
import TwitchVodsObject from 'components/twitchVods/TwitchVodsObject';
import FontAwesome from 'react-fontawesome';
import * as lionActions from 'actions/lion';

let twitchName = '';
let json = require('config.json');
twitchName = json.twitchName;

class TwitchVodsContainer extends React.Component{

  componentDidMount() {
    const scrollbar = Scrollbar.init(document.querySelector('#twitch__wrapper'), {
      alwaysShowTracks: true,
    });
    this.scrollbar = scrollbar;
  }

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){

    const {
      twitchVodValues,
      transitionStatus,
    } = this.props;

    const wrapperName= classNames(
      'twitter__wrapper',
      {
        'twitter__wrapper--hidden': transitionStatus === 'start' || transitionStatus === 'end',
      }
    );

    return(
      <div
        className={wrapperName}
        id="twitch__wrapper"
      >
        <div
          className="twitch_header"
          onMouseEnter={()=>this.toggleSmile(true)}
          onMouseLeave={()=>this.toggleSmile(false)}
        >
          <a
            href={'https://twitch.tv/'+twitchName}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesome name="twitch"/>
          &nbsp;{twitchName}
          </a>
        </div>
        <div className="twitter__container">
          {twitchVodValues.length >= 4 ? twitchVodValues.map((value, index)=>(
            <div key={index} onLoad={()=>this.scrollbar.update()}>
              <TwitchVodsObject
                title = {value.title}
                url = {value.url}
                views = {value.views}
                preview = {value.preview}
                created_at = {value.created_at}
              />
            </div>
          )):null}
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    transitionStatus: state.transition.transitionStatus,
    twitterDisplay: state.twitter.twitterDisplay,
    twitchVodValues: state.twitch.twitchVodValues,
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(TwitchVodsContainer);