import React from 'react';
import {connect} from 'react-redux';
import Scrollbar from 'smooth-scrollbar';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';
import FontAwesome from 'react-fontawesome';
import PanelWrapper from 'components/PanelWrapper';

let twitchLink = '';
let twitterLink = '';
let instagramLink = '';
let discordLink = '';
let streamelementsLink = '';
let youtubeLink = '';

let json = require('config.json');
twitchLink = 'https://www.twitch.tv/'+json.twitchName;
twitterLink = 'https://twitter.com/'+json.twitterName;
instagramLink = 'https://instagram.com/'+json.instagramName;
discordLink = json.discordLink;
streamelementsLink = 'https://streamelements.com/'+json.streamelementsName+'/tip';
youtubeLink = 'https://youtube.com/channel'+json.youtubeName+'/tip';

class LinksContainer extends React.Component{

  componentDidMount() {
    const scrollbar = Scrollbar.init(document.querySelector('#links__wrapper'), {
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

    const linksArray = [
      {text: 'Twitch', link: twitchLink, icon: 'twitch'},
      {text: 'Discord', link: discordLink, icon: 'gamepad'},
      {text: 'StreamElements', link: streamelementsLink, icon: 'heart'},
      {text: 'Instagram', link: instagramLink, icon: 'instagram'},
      {text: 'Twitter', link: twitterLink, icon: 'twitter'},
      {text: 'Youtube', link: youtubeLink, icon: 'youtube'},
    ];

    return(
      <PanelWrapper>
        <div id="links__wrapper">
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
                      <FontAwesome name={value.icon}/>&nbsp;&nbsp;{value.text}
                    </div>
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      </PanelWrapper>
    );
  }
}

export default connect(
  (state) => ({
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(LinksContainer);