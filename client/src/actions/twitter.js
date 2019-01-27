export const RECEIVE_TWITTER = Symbol('RECEIVE_TWITTER');

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