import {
  CHAT_REORDER,
  CHAT_RESIZE,
} from '../actions/stream';

const DEFAULT_STATE={
  chatPosition: true,
  chsatSize: true,
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case CHAT_REORDER:
    return state = {...state, chatPosition: payload.chatPosition};
  case CHAT_RESIZE:
    return state = {...state, chatSize: payload.chatSize};
  default:
    return state;
  }
};
