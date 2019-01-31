import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';
import FontAwesome from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';

let streamelementsLink = '';
let twitchName = '';
let json = require('config.json');
twitchName = json.twitchName;
streamelementsLink = 'https://streamelements.com/'+json.streamelementsName+'/tip';

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
      {text: 'Twitter Feed', route: siteRoutes.twitter, icon: 'twitter'},
      {text: 'Twitch Vods', route: siteRoutes.twitchVods, icon: 'folder'},
      {text: 'Links and Social Media', route: siteRoutes.links, icon: 'external-link'},
      {text: 'Big Screen', route: siteRoutes.twitchScreen, icon: 'tv'},
    ];

    return(
      <div className="navbar_wrapper">

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
      </div>
    );
  }
}

export default connect(
  (state) => ({
    loadedContent: state.transition.loadedContent,
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(Navbar);

