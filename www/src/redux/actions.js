import axios from "axios";
var axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_URL
});

export const FETCH_START = "request_files";
export const FETCH_SUCCESS = "receive_files";
export const UPLOAD_START = "upload_start";
export const UPLOAD_SUCCESS = "upload_success";
export const UPLOAD_FAIL = "upload_fail";
export const REMOVE_START = "remove_start";
export const REMOVE_SUCCESS = "remove_success";
export const REMOVE_FAIL = "remove_fail";
export const DISMISS_ERROR = "dismiss_error";

// Sync actions

export function fetchStart() {
  return {
    type: FETCH_START
  };
}

export function fetchSuccess(list) {
  return {
    type: FETCH_SUCCESS,
    payload: list
  };
}

export function uploadStart(data) {
  return {
    type: UPLOAD_START,
    payload: data
  };
}

export function uploadSuccess(id) {
  return {
    type: UPLOAD_SUCCESS,
    payload: id
  };
}

export function uploadFailed(error) {
  return {
    type: UPLOAD_FAIL,
    payload: error
  };
}

export function removeStart(id) {
  return {
    type: REMOVE_START,
    payload: id
  };
}

export function removeSuccess(id) {
  return {
    type: REMOVE_SUCCESS,
    payload: id
  };
}

export function removeFailed(error) {
  return {
    type: REMOVE_FAIL,
    payload: error
  };
}

export function dismissError() {
  return {
    type: DISMISS_ERROR
  };
}

// Async actions processed with redux-thunks

export function fetchFiles() {
  return function(dispatch) {
    dispatch(fetchStart());
    return axiosInstance.get("/files").then(response => {
      dispatch(fetchSuccess(response.data));
    });
  };
}

export function uploadFile(data) {
  return function(dispatch) {
    dispatch(uploadStart());
    return axiosInstance
      .post("/files", data)
      .then(response => {
        dispatch(uploadSuccess(response.data));
      })
      .catch(error => {
        dispatch(
          uploadFailed(
            "Can't upload file. Check file size (<100KB), and allowed format (.jpeg, .png, .gif, .txt)"
          )
        );
      });
  };
}

export function removeFile(id) {
  return function(dispatch) {
    dispatch(removeStart());
    return axiosInstance
      .delete("/files/" + id)
      .then(response => {
        dispatch(removeSuccess(response.data));
      })
      .catch(error => {
        dispatch(removeFailed("Failed to delete this file"));
      });
  };
}
