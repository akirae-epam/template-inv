import {
  START_TRANSITION,
  LOAD_CONTENT,
  PREVIOUS_PAGE_NAME,
  REMOVE_PREVIOUS_CONTENT,
} from 'actions/transition';

const DEFAULT_STATE={
  transitionStatus: null,
  loadedContent: {},
  previousPage: '',
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case START_TRANSITION:
    state = {
      ...state,
      transitionStatus: payload.transitionStatus
    };
    return state;
  case LOAD_CONTENT:
    return {
      ...state,
      loadedContent: {
        ...state.loadedContent,
        [payload.location]: payload.loadStatus,
      }
    };
  case PREVIOUS_PAGE_NAME:
    return {
      ...state,
      previousPage: payload.pageName,
    };
  case REMOVE_PREVIOUS_CONTENT:
    return {
      ...state,
      loadedContent: payload.newList,
    };
  default:
    return state;
  }
};
