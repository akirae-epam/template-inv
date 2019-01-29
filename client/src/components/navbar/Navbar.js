import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';
import FontAwesome from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';

let twitchName = '';
let json = require('config.json');
twitchName = json.twitchName;

class Navbar extends React.Component{

  setSmiling = () => {
    this.props.lionActions.setSmile(true);
  }
  stopSmiling = () => {
    this.props.lionActions.setSmile(false);
  }

  render(){

    const {
      loadedContent,
    } = this.props;

    return(
      <div
        className="navbar_wrapper"
      >

        {loadedContent[siteRoutes.home]?
          <div className="navbar_option">
            <FontAwesome name="home"/>
          </div>
          :
          <Link to={siteRoutes.home}
            onMouseEnter={()=>this.setSmiling()}
            onMouseLeave={()=>this.stopSmiling()}>
            <div className="navbar_option">
              <FontAwesome name="home"/>
            </div>
          </Link>
        }

        {loadedContent[siteRoutes.twitter]?
          <div className="navbar_option">
            <FontAwesome name="twitter"/>
          </div>
          :
          <Link to={siteRoutes.twitter}
            onMouseEnter={()=>this.setSmiling()}
            onMouseLeave={()=>this.stopSmiling()}>
            <div className="navbar_option">
              <FontAwesome name="twitter"/>
            </div>
          </Link>
        }

        {loadedContent[siteRoutes.twitchVods]?
          <div className="navbar_option">
            <FontAwesome name="folder"/>
          </div>
          :
          <Link to={siteRoutes.twitchVods}
            onMouseEnter={()=>this.setSmiling()}
            onMouseLeave={()=>this.stopSmiling()}>
            <div className="navbar_option">
              <FontAwesome name="folder"/>
            </div>
          </Link>
        }

        {/*loadedContent[siteRoutes.twitchScreen]?
          <div className="navbar_option">
            <FontAwesome name="twitch"/>
          </div>
          :
          <Link to={siteRoutes.twitchScreen}>
            <div className="navbar_option">
              <FontAwesome name="twitch"/>
            </div>
          </Link>
        */}

        {loadedContent[siteRoutes.links]?
          <div className="navbar_option">
            <FontAwesome name="external-link"/>
          </div>
          :
          <Link to={siteRoutes.links}
            onMouseEnter={()=>this.setSmiling()}
            onMouseLeave={()=>this.stopSmiling()}>
            <div className="navbar_option">
              <FontAwesome name="external-link"/>
            </div>
          </Link>
        }

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

