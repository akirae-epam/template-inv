import {history} from 'store';

export const FETCH_SCHEDULE_STARTED = Symbol('FETCH_SCHEDULE_STARTED');
export const FETCH_SCHEDULE_SUCCEEDED = Symbol('FETCH_SCHEDULE_SUCCEEDED');
export const FETCH_SCHEDULE_FAILURE = Symbol('FETCH_SCHEDULE_FAILURE');

export const POST_SCHEDULE_STARTED = Symbol('POST_SCHEDULE_STARTED');
export const POST_SCHEDULE_SUCCEEDED = Symbol('POST_SCHEDULE_SUCCEEDED');
export const POST_SCHEDULE_FAILURE = Symbol('POST_SCHEDULE_FAILURE');

export const PUT_SCHEDULE_STARTED = Symbol('PUT_SCHEDULE_STARTED');
export const PUT_SCHEDULE_SUCCEEDED = Symbol('PUT_SCHEDULE_SUCCEEDED');
export const PUT_SCHEDULE_FAILURE = Symbol('PUT_SCHEDULE_FAILURE');

export const REMOVE_SCHEDULE_STARTED = Symbol('REMOVE_SCHEDULE_STARTED');
export const REMOVE_SCHEDULE_SUCCEEDED = Symbol('REMOVE_SCHEDULE_SUCCEEDED');
export const REMOVE_SCHEDULE_FAILURE = Symbol('REMOVE_SCHEDULE_FAILURE');

const fetchScheduleStarted = request => ({type: FETCH_SCHEDULE_STARTED, request});
const fetchScheduleSucceeded = data => ({type: FETCH_SCHEDULE_SUCCEEDED, data});
const fetchScheduleFailure = (data, error) => ({type: FETCH_SCHEDULE_FAILURE, data, error});

const postScheduleStarted = request => ({type: POST_SCHEDULE_STARTED, request});
const postScheduleSucceeded = data => ({type: POST_SCHEDULE_SUCCEEDED, data});
const postScheduleFailure = (data, error) => ({type: POST_SCHEDULE_FAILURE, data, error});

const putScheduleStarted = request => ({type: PUT_SCHEDULE_STARTED, request});
const putScheduleSucceeded = data => ({type: PUT_SCHEDULE_SUCCEEDED, data});
const putScheduleFailure = (data, error) => ({type: PUT_SCHEDULE_FAILURE, data, error});

const removeScheduleStarted = request => ({type: REMOVE_SCHEDULE_STARTED, request});
const removeScheduleSucceeded = data => ({type: REMOVE_SCHEDULE_SUCCEEDED, data});
const removeScheduleFailure = (data, error) => ({type: REMOVE_SCHEDULE_FAILURE, data, error});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
/*======================================
=               GET SCHEDULE              =
======================================*/
function getSchedule() {
  return () => {
    return fetch('/schedule/view');
  };
}
export function fetchSchedule() {
  return (dispatch) => {
    dispatch(fetchScheduleStarted());
    return dispatch(getSchedule())
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchScheduleSucceeded(json));
      })
      .catch(error => dispatch(fetchScheduleFailure(error)));
  };
}

/*======================================
=              ADD DAY                 =
======================================*/
function postScheduleData(data) {
  return () => {
    return fetch('/schedule/post',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  };
}
export function postSchedule(values) {
  return (dispatch) => {
    dispatch(postScheduleStarted());
    return dispatch(postScheduleData(values))
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(postScheduleSucceeded(json));
      })
      .catch(error => dispatch(postScheduleFailure(error)));
  };
}

export function postScheduleThenUpdate(values, path) {
  return (dispatch) => {
    dispatch(postSchedule(values))
      .then(()=>{
        dispatch(fetchSchedule());
        history.push(path);
      });
  };
}

/*======================================
=             EDIT DAY               =
======================================*/
function putScheduleData(data) {
  return () => {
    return fetch('/schedule/put',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  };
}
export function putSchedule(values) {
  return (dispatch) => {
    dispatch(putScheduleStarted());
    return dispatch(putScheduleData(values))
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(putScheduleSucceeded(json));
      })
      .catch(error => dispatch(putScheduleFailure(error)));
  };
}

export function putScheduleThenUpdate(values, path) {
  return (dispatch) => {
    dispatch(putSchedule(values))
      .then(()=>{
        dispatch(fetchSchedule());
        history.push(path);
      });
  };
}

/*======================================
=           DELETE SCHEDULE            =
======================================*/
function deleteSchedule(id, rev) {
  return () => {
    return fetch('/projects/delete',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          rev: rev,
        })
      });
  };
}
export function removeSchedule(id, rev, awsKey) {
  return (dispatch) => {
    dispatch(removeScheduleStarted());
    return dispatch(deleteSchedule(id, rev))
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(removeScheduleSucceeded(json));
      })
      .catch(error => dispatch(removeScheduleFailure(error)));
  };
}
//requires ()=>dispatch for fetchViewData or data is fetched before content is added
export function removeScheduleThenUpdate(id, rev, awsKey) {
  return (dispatch) => {
    dispatch(removeSchedule(id, rev, awsKey))
      .then(()=>dispatch(fetchSchedule()));
  };
}