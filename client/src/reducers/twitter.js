import {
  RECEIVE_TWITTER,
  TOGGLE_TWITTER,
} from 'actions/twitter';

const DEFAULT_STATE={
  twitterValues: {},
  twitterDisplay: true,
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case RECEIVE_TWITTER:
    return state = {
      ...state,
      twitterValues: payload.payload
    };
  case TOGGLE_TWITTER:
    return state = {
      ...state,
      twitterDisplay:payload.twitterDisplay
    };
  default:
    return state;
  }
};
