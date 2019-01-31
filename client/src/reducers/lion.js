import {
  SET_SMILE,
  SET_WINDOW_HALF_X,
  SET_WINDOW_HALF_Y,
} from 'actions/lion';

const DEFAULT_STATE={
  isSmiling: false,
  windowHalfX: 0,
  windowHalfY: 0,
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case SET_SMILE:
    return state = {...state, isSmiling: payload.payload};
  case SET_WINDOW_HALF_X:
    return state = {...state, windowHalfX: payload.payload};
  case SET_WINDOW_HALF_Y:
    return state = {...state, windowHalfY: payload.payload};
  default:
    return state;
  }
};
