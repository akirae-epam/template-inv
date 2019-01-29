import React, { Component } from 'react';
import {connect} from 'react-redux';
import {siteRoutes} from 'data/siteRoutes';

import Home from 'pages/Home';
import TwitterContainer from 'components/twitter/TwitterContainer';
import TwitchVodsContainer from 'components/twitchVods/TwitchVodsContainer';
import LinksContainer from 'components/links/LinksContainer';
import Navbar from 'components/navbar/Navbar';

class PublicRoutes extends Component {

  render() {
    const {
      loadedContent,
    } = this.props;

    return (
      <div>
        <Home/>
        {loadedContent[siteRoutes.twitter]?
        <TwitterContainer />:null}
        {loadedContent[siteRoutes.twitchVods]?
        <TwitchVodsContainer />:null}
        {loadedContent[siteRoutes.links]?
        <LinksContainer />:null}
        <Navbar/>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const loadedContent = state.transition.loadedContent;

    let currentPage;
    currentPage = Object.keys(loadedContent).find(key => loadedContent[key] === true);

    return {
      currentPage,
      loadedContent,
    };
  },
  dispatch => ({
  }),
)(PublicRoutes);
