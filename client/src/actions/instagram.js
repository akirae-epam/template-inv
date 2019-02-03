export const FETCH_INSTAGRAM_FOLLOWER_COUNT = Symbol('FETCH_INSTAGRAM_FOLLOWER_COUNT');

export const fetchInstagramFollowerCount = (payload) => {
  return{
    type: FETCH_INSTAGRAM_FOLLOWER_COUNT,
    payload: payload,
  };
};