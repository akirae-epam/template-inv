export const CHAT_REORDER = Symbol('CHAT_REORDER');
export const CHAT_RESIZE = Symbol('CHAT_RESIZE');

export const chatReorder = (chatPosition) =>{
  return{
    type: CHAT_REORDER,
    chatPosition,
  };
};
export const chatResize = (chatSize) =>{
  return{
    type: CHAT_RESIZE,
    chatSize,
  };
};
