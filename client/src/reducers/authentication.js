import {
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_ERROR
} from 'actions/authentication';

const DEFAULT_STATE={
  loggedIn: false,
  error: null,
  email: null,
};

export default(state=DEFAULT_STATE, payload) => {
  switch(payload.type){
  case AUTH_USER:
    return {
      ...state,
      loggedIn: true,
      error: null,
      email: payload.payload.email,
    };
  case SIGN_OUT_USER:
    return {
      ...state,
      loggedIn: false,
      error: null
    };
  case AUTH_ERROR:
    return {
      ...state,
      error: payload.payload.message
    };
  default:
    return state;
  }
};
