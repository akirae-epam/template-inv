import {
  RECEIVE_TWITTER,
  SELECT_TWITTER_IMAGE,
} from 'actions/twitter';

const DEFAULT_STATE={
  twitterValues: {},
  twitterImage: '',
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
  default:
    return state;
  }
};
