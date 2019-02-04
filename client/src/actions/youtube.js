export const FETCH_YOUTUBE_FOLLOWER_COUNT = Symbol('FETCH_YOUTUBE_FOLLOWER_COUNT');

export const fetchYoutubeFollowerCount = (payload) => {
  return{
    type: FETCH_YOUTUBE_FOLLOWER_COUNT,
    payload: payload,
  };
};