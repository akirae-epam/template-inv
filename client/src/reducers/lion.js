import {
  SET_SMILE,
} from 'actions/lion'

const DEFAULT_STATE={
  isSmiling: false,
}

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
    case SET_SMILE:
      return state = {...state, isSmiling: payload.payload};
    default:
      return state;
  }
};
