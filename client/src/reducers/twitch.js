import {
  SET_LIVE,
  FETCH_TWITCH_VODS,
  SET_TWITCH_VOD,
  FETCH_TWITCH_FOLLOWER_COUNT,
} from 'actions/twitch';

const DEFAULT_STATE={
  liveValues: false,
  twitchVodValues: [],
  currentVod: '',
  followerCount: 0,
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case SET_LIVE:
    return state = {
      ...state,
      liveValues: payload.payload
    };
  case FETCH_TWITCH_VODS:
    return state = {
      ...state,
      twitchVodValues: payload.payload
    };
  case SET_TWITCH_VOD:
    return state = {
      ...state,
      currentVod: payload.payload
    };
  case FETCH_TWITCH_FOLLOWER_COUNT:
    return state = {
      ...state,
      followerCount: payload.payload
    };
  default:
    return state;
  }
};
