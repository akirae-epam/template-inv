import {
  RECEIVE_TWITTER,
} from 'actions/twitter';

const DEFAULT_STATE={
  twitterValues: {},
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case RECEIVE_TWITTER:
    return state = {
      ...state,
      twitterValues: payload.payload
    };
  default:
    return state;
  }
};
