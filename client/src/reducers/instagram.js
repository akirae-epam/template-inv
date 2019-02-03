import {
  FETCH_INSTAGRAM_FOLLOWER_COUNT,
} from 'actions/instagram';

const DEFAULT_STATE={
  followerCount: 0,
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case FETCH_INSTAGRAM_FOLLOWER_COUNT:
    return state = {
      ...state,
      followerCount: payload.payload
    };
  default:
    return state;
  }
};
