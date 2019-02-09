import React, { Component } from 'react';
import {connect} from 'react-redux';
import {siteRoutes} from 'data/siteRoutes';
import {Switch, Route} from 'react-router-dom';

import Home from 'pages/Home';
import TwitterContainer from 'components/twitter/TwitterContainer';
import TwitchVodsContainer from 'components/twitchVods/TwitchVodsContainer';
import LinksContainer from 'components/links/LinksContainer';
import Navbar from 'components/navbar/Navbar';
import BigScreenContainer from 'components/bigscreen/BigScreenContainer';
import TwitchVodContainer from 'components/bigscreen/TwitchVodContainer';
import ScheduleWrapper from 'components/schedule/ScheduleWrapper';

import TwitterImage from 'components/twitter/TwitterImage';
import GetTwitchVod from 'components/services/GetTwitchVod';

import {
  selectLoadedContent,
  selectCurrentPage,
} from 'reducers';

class PublicRoutes extends Component {

  render() {
    const {
      currentPage,
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
        {loadedContent[siteRoutes.twitchScreen]?
          <BigScreenContainer />:null}

        {loadedContent[siteRoutes.schedule]?
          <ScheduleWrapper />:null}

        {currentPage && currentPage.substring(0, siteRoutes.twitchVodSingle.length) === siteRoutes.twitchVodSingle ?
          <TwitchVodContainer />:null}

        {loadedContent[siteRoutes.twitter]?
          <TwitterImage />:null}

        <Switch>
          <Route exact path={siteRoutes.twitchVodSingle+'/:id'}
            render={(props) =>(
              <GetTwitchVod {...props} key={props.match.params.id}/>
            )}/>
        </Switch>

        <Navbar/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    loadedContent: selectLoadedContent(state),
    currentPage: selectCurrentPage(state),
  }),
  dispatch => ({
  }),
)(PublicRoutes);
