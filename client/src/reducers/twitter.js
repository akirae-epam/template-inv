import {
  RECEIVE_TWITTER,
  SELECT_TWITTER_IMAGE,
  FETCH_TWITTER_FOLLOWER_COUNT,
} from 'actions/twitter';

const DEFAULT_STATE={
  twitterValues: {},
  twitterImage: '',
  followerCount: 0,
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case RECEIVE_TWITTER:
    return state = {
      ...state,
      twitterValues: payload.payload
    };
  case SELECT_TWITTER_IMAGE:
    return state = {
      ...state,
      twitterImage:payload.twitterImage
    };
  case FETCH_TWITTER_FOLLOWER_COUNT:
    return state = {
      ...state,
      followerCount:payload.payload
    };
  default:
    return state;
  }
};
