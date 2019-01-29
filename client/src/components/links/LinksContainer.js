import React from 'react';
import {connect} from 'react-redux';
import Scrollbar from 'smooth-scrollbar';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';

let twitchLink = '';
let twitterLink = '';
let instagramLink = '';
let discordLink = '';
let streamlabsLink = '';

let json = require('config.json');
twitchLink = 'https://www.twitch.tv/'+json.twitchName;
twitterLink = 'https://twitter.com/'+json.twitterName;
instagramLink = 'https://instagram.com/'+json.instagramName;
discordLink = json.discordLink;
streamlabsLink = 'https://streamlabs.com/'+json.streamlabsName;

class LinksContainer extends React.Component{

  componentDidMount() {
    const scrollbar = Scrollbar.init(document.querySelector('#twitter__wrapper'), {
      alwaysShowTracks: true,
    });
    this.scrollbar = scrollbar;
  }
  setSmiling = () => {
    this.props.lionActions.setSmile(true);
  }
  stopSmiling = () => {
    this.props.lionActions.setSmile(false);
  }

  render(){

    const {
      transitionStatus,
    } = this.props;

    const linksArray = [
      {text: 'Twitch', link: twitchLink},
      {text: 'Discord', link: discordLink},
      {text: 'Streamlabs', link: streamlabsLink},
      {text: 'Instagram', link: instagramLink},
      {text: 'Twitter', link: twitterLink},
    ];

    const wrapperName= classNames(
      'twitter__wrapper',
      {
        'twitter__wrapper--hidden': transitionStatus === 'start' || transitionStatus === 'end',
      }
    );

    return(
      <div
        className={wrapperName}
        id="twitter__wrapper"
      >
        <div className="twitter_header">
          Links
        </div>
        <div className="twitter__container">
          {
            linksArray.map((value, key) => (
              <div key={key}
                className="links_link__wrapper"
                onMouseEnter={()=>this.setSmiling()}
                onMouseLeave={()=>this.stopSmiling()}
              >
                <a href={value.link} className="links_link__container">
                  <div key={key}>
                  {value.text}
                  </div>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    transitionStatus: state.transition.transitionStatus,
    twitterDisplay: state.twitter.twitterDisplay,
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(LinksContainer);