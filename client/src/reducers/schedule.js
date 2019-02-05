import {
  FETCH_SCHEDULE_SUCCEEDED,
} from 'actions/schedule';

const DEFAULT_STATE={
  schedules: {},
};

export default(state=DEFAULT_STATE, payload)=>
{
  switch(payload.type){
  case FETCH_SCHEDULE_SUCCEEDED:
    return state = {
      ...state,
      schedules: payload.data
    };
  default:
    return state;
  }
};
