export const SET_LIVE = Symbol('SET_LIVE');
export const FETCH_TWITCH_VODS = Symbol('FETCH_TWITCH_VODS');
export const SET_TWITCH_VOD = Symbol('SET_TWITCH_VOD');
export const FETCH_TWITCH_FOLLOWER_COUNT = Symbol('FETCH_TWITCH_FOLLOWER_COUNT');

export const setLive = (payload) =>{
  return{
    type: SET_LIVE,
    payload,
  };
};
export const fetchTwitchVods = (payload) =>{
  return{
    type: FETCH_TWITCH_VODS,
    payload,
  };
};
export const setTwitchVod = (payload) =>{
  return{
    type: SET_TWITCH_VOD,
    payload,
  };
};
export const fetchTwitchFollowerCount = (payload) => {
  return{
    type: FETCH_TWITCH_FOLLOWER_COUNT,
    payload: payload,
  };
};