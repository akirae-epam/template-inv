import {
  SET_LIVE,
} from 'actions/twitch'

const DEFAULT_STATE={
  liveValues: {},
}

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
    case SET_LIVE:
      return state = {...state, liveValues: payload.payload};
    default:
      return state;
  }
};
