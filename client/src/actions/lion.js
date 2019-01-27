export const SET_SMILE = Symbol('SET_SMILE');

export const setSmile = (payload) =>{
  return{
    type: SET_SMILE,
    payload,
  };
}
