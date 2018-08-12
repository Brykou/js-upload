import {
  FETCH_START,
  FETCH_SUCCESS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  REMOVE_START,
  REMOVE_SUCCESS,
  REMOVE_FAIL,
  DISMISS_ERROR
} from "./actions.js";

const initialState = {
  files: [],
  error: null,
  isFetching: false,
  isRemoving: false,
  isUploading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        files: action.payload,
        error: null
      });
    case UPLOAD_START:
      return Object.assign({}, state, {
        isUploading: true,
        error: null
      });
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        isUploading: false,
        files: state.files.concat(action.payload),
        error: null
      });
    case UPLOAD_FAIL:
      return Object.assign({}, state, {
        isUploading: false,
        error: action.payload
      });
    case REMOVE_START:
      return Object.assign({}, state, {
        isRemoving: true,
        error: null
      });
    case REMOVE_SUCCESS:
      return Object.assign({}, state, {
        isRemoving: false,
        files: state.files.filter(({ id }) => id !== action.payload),
        error: null
      });
    case REMOVE_FAIL:
      return Object.assign({}, state, {
        isRemoving: false,
        error: action.payload
      });
    case DISMISS_ERROR:
      return Object.assign({}, state, {
        error: null
      });
    default:
      return state;
  }
};
