import twitch from 'reducers/twitch';
import lion from 'reducers/lion';
import twitter from 'reducers/twitter';
import transition from 'reducers/transition';
import stream from 'reducers/stream';
import instagram from 'reducers/instagram';
import youtube from 'reducers/youtube';
import authentication from 'reducers/authentication';
import schedule from 'reducers/schedule';
import { reducer as reducerForm } from 'redux-form';

import {createSelector} from 'reselect';

const reducers={
  form: reducerForm,
  twitch,
  lion,
  twitter,
  transition,
  stream,
  instagram,
  youtube,
  authentication,
  schedule,
};

export default reducers;

/*======================================
=                TWITCH                =
======================================*/
export const selectTwitchVodValues = (state) => state.twitch.twitchVodValues;

export const selectTwitchCurrentVod = (state) => state.twitch.currentVod;

export const selectTwitchLiveValues = (state) => state.twitch.liveValues;

export const selectTwitchFollowerCount = (state) => state.twitch.followerCount;

export const selectTwitchIsLive = createSelector(
  selectTwitchLiveValues,
  (twitchLive) => twitchLive === true ?
    true
    :
    false
);

export const selectTwitchFollowerCountThousands = createSelector(
  selectTwitchFollowerCount,
  (followerCount) => followerCount ?
    Math.round((followerCount/1000) *10)/10 + 'k'
    :
    0
);

/*======================================
=               TWITTER                =
======================================*/
export const selectTwitterValues = (state) => state.twitter.twitterValues;

export const selectTwitterImage = (state) => state.twitter.twitterImage;

export const selectTwitterFollowerCount = (state) => state.twitter.followerCount;

export const selectTwitterFollowerCountThousands = createSelector(
  selectTwitterFollowerCount,
  (followerCount) => followerCount ?
    Math.round((followerCount/1000) *10)/10 + 'k'
    :
    0
);

export const selectTwitterImageExists = createSelector(
  selectTwitterImage,
  (twitterImage) => twitterImage ?
    twitterImage.length >3
    :
    false
);

/*======================================
=              INSTAGRAM               =
======================================*/
export const selectInstagramFollowerCount = (state) => state.instagram.followerCount;

export const selectInstagramFollowerCountThousands = createSelector(
  selectInstagramFollowerCount,
  (followerCount) => followerCount ?
    Math.round((parseInt(followerCount)/1000) *10)/10 + 'k'
    :
    0
);

/*======================================
=              YOUTUBE               =
======================================*/
export const selectYoutubeFollowerCount = (state) => state.youtube.followerCount;

export const selectYoutubeFollowerCountThousands = createSelector(
  selectYoutubeFollowerCount,
  (followerCount) => followerCount ?
    Math.round((parseInt(followerCount)/1000) *10)/10 + 'k'
    :
    0
);

/*======================================
=              TRANSITION              =
======================================*/
export const selectTransitionStatus = (state) => state.transition.transitionStatus;

export const selectLoadedContent = (state) => state.transition.loadedContent;

export const selectCurrentPage = createSelector(
  selectLoadedContent,
  (loadedContent) => loadedContent ?
    Object.keys(loadedContent).find(key => loadedContent[key] === true)
    :
    ''
);

export const selectPanelSide = (state) => state.transition.panelSide;

/*======================================
=                STREAM                =
======================================*/
export const selectStreamChatPosition = (state) => state.stream.chatPosition;

export const selectStreamChatSize = (state) => state.stream.chatSize;

/*======================================
=                LION                 =
======================================*/
export const selectLionLoaded = (state) => state.lion.lionLoaded;

export const selectLionSmiling = (state) => state.lion.isSmiling;

export const selectLionWindowHalfX = (state) => state.lion.windowHalfX;

export const selectLionWindowHalfY = (state) => state.lion.windowHalfY;

/*======================================
=              SCHEDULE               =
======================================*/
export const selectSchedules = (state) => state.schedule.schedules;
