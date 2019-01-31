export const RECEIVE_TWITTER = Symbol('RECEIVE_TWITTER');
export const SELECT_TWITTER_IMAGE = Symbol('SELECT_TWITTER_IMAGE');

export const fetchTwitter = (payload) =>{
  return (dispatch) => {
    let newArray = [];
    if (payload.length > 2) {
      payload.map((value) => {
        return newArray.push(value.value);
      });
    }
    dispatch(receiveTwitter(newArray));
  };
};

export const receiveTwitter = (payload) => {
  return{
    type: RECEIVE_TWITTER,
    payload: payload,
  };
};

export const selectTwitterImage = (twitterImage) => {
  return{
    type: SELECT_TWITTER_IMAGE,
    twitterImage: twitterImage,
  };
};