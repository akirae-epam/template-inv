export const SET_LIVE = Symbol('SET_LIVE');

export const setLive = (payload) =>{
  return{
    type: SET_LIVE,
    payload,
  };
}
