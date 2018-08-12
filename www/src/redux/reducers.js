import {
  FETCH_START,
  FETCH_SUCCESS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  REMOVE_START,
  REMOVE_SUCCESS,
  REMOVE_FAIL
} from "./actions.js";

const initialState = {
  files: [],
  isFetching: false,
  isRemoving: false,
  isUploading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        files: action.payload
      });
    case UPLOAD_START:
      return Object.assign({}, state, {
        isUploading: true
      });
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        isUploading: false,
        files: state.files.concat(action.payload)
      });
    case UPLOAD_FAIL:
      return Object.assign({}, state, {
        isUploading: false
      });
    case REMOVE_START:
      return Object.assign({}, state, {
        isRemoving: true
      });
    case REMOVE_SUCCESS:
      return Object.assign({}, state, {
        isRemoving: false,
        files: state.files.filter(({ id }) => id !== action.payload)
      });
    case REMOVE_FAIL:
      return Object.assign({}, state, {
        isRemoving: false
      });
    default:
      return state;
  }
};
