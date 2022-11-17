import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET,
  } from "../constants/Constants";

  export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true,  users: []};
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload };
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
// USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload };
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case USER_DETAILS_RESET:
        return { user: {} };
      default:
        return state;
    }
  };
  
  // UPDATE PROFILE
  export const userUpdateProfileReducer = (state = {userInfo: {}}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload };
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      case USER_UPDATE_PROFILE_RESET:
      return { userInfo: {} };
      default:
        return state;
    }
  };