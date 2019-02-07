import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';
import FontAwesome from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';
import discordImage from 'media/discord.svg';

import {
  selectLoadedContent,
} from 'reducers';

let streamelementsLink = '';
let twitchName = '';
let twitterName = '';
let instagramName = '';
let youtubeName = '';
let discordLink = '';
let json = require('config.json');
twitchName = json.twitchName;
twitterName = json.twitterName;
instagramName = json.instagramName;
streamelementsLink = 'https://streamelements.com/'+json.streamelementsName+'/tip';
youtubeName = json.youtubeName;
discordLink = json.discordLink;

class Navbar extends React.Component{

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){

    const {
      loadedContent,
    } = this.props;

    const navbarArray = [
      {text: 'Home', route: siteRoutes.home, icon: 'home'},
      {text: 'Schedule', route: siteRoutes.schedule, icon: 'calendar'},
      {text: 'Twitter Feed', route: siteRoutes.twitter, icon: 'twitter'},
      {text: 'Twitch Vods', route: siteRoutes.twitchVods, icon: 'folder'},
      {text: 'Links and Social Media', route: siteRoutes.links, icon: 'external-link'},
      {text: 'Big Screen', route: siteRoutes.twitchScreen, icon: 'tv'},
    ];

    return(
      <div className="navbar__wrapper">

        <div className="navbar__container">
          {navbarArray.map((value, key) => (
            loadedContent[value.route] ?
              <div className="navbar_option" key={key}>
                <FontAwesome name={value.icon}/>
              </div>
              :
              <div
                className="navbar_option__container"
                onMouseEnter={()=>this.toggleSmile(true)}
                onMouseLeave={()=>this.toggleSmile(false)}
                key={key}
              >
                <Link to={value.route}>
                  <div className="navbar_option">
                    <FontAwesome name={value.icon}/>
                  </div>
                  <div className="navbar_option__overlay">
                    {value.text}
                  </div>
                </Link>
              </div>
          ))
          }
        </div>

        <div className="navbar__socials">
          <div className="navbar_option__container">
            <a
              href={'https://twitch.tv/'+twitchName+'/subscribe'}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="navbar_option">
                <FontAwesome name="heartbeat"/>
              </div>
              <div className="navbar_option__overlay">
                Subscribe
              </div>
            </a>
          </div>

          <div className="navbar_option__container">
            <a
              href={streamelementsLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="navbar_option">
                <FontAwesome name="heart"/>
              </div>
              <div className="navbar_option__overlay">
                Donate
              </div>
            </a>
          </div>

          <div
            className="navbar_option__container"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}>
            <a
              href={'https://twitter.com/'+twitterName}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="navbar_option">
                <FontAwesome name="twitter"/>
              </div>
              <div className="navbar_option__overlay">
                Twitter
              </div>
            </a>
          </div>

          <div
            className="navbar_option__container"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}>
            <a
              href={'https://instagram.com/'+instagramName}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="navbar_option">
                <FontAwesome name="instagram"/>
              </div>
              <div className="navbar_option__overlay">
                Instagram
              </div>
            </a>
          </div>

          <div
            className="navbar_option__container"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}>
            <a
              href={'https://twitch.tv/'+twitchName}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="navbar_option">
                <FontAwesome name="twitch"/>
              </div>
              <div className="navbar_option__overlay">
                Twitch
              </div>
            </a>
          </div>

          <div
            className="navbar_option__container"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}>
            <a
              href={'https://youtube.com/channel/'+youtubeName}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="navbar_option">
                <FontAwesome name="youtube"/>
              </div>
              <div className="navbar_option__overlay">
                Youtube
              </div>
            </a>
          </div>

          <div
            className="navbar_option__container"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}>
            <a
              href={discordLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="navbar_option">
                <img src={discordImage} alt="discord" className="navbar__icon"/>
              </div>
              <div className="navbar_option__overlay">
                Discord
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    loadedContent: selectLoadedContent(state),
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(Navbar);

