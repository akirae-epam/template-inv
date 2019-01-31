export const SET_SMILE = Symbol('SET_SMILE');
export const SET_WINDOW_HALF_X = Symbol('SET_WINDOW_HALF_X');
export const SET_WINDOW_HALF_Y = Symbol('SET_WINDOW_HALF_Y');

export const setSmile = (payload) =>{
  return{
    type: SET_SMILE,
    payload,
  };
};
export const setWindowHalfX = (payload) =>{
  return{
    type: SET_WINDOW_HALF_X,
    payload,
  };
};
export const setWindowHalfY = (payload) =>{
  return{
    type: SET_WINDOW_HALF_Y,
    payload,
  };
};
