import {
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_RESET,
    COMMENT_CREATE_SUCCESS,
    COMMENT_UPDATE_FAIL,
    COMMENT_UPDATE_REQUEST,
    COMMENT_UPDATE_RESET,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_DETAILS_FAIL,
    COMMENT_DETAILS_REQUEST,
    COMMENT_DETAILS_SUCCESS,
    COMMENT_LIST_FAIL,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
  } from "../constants/Constants";
  
  export const commentListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
      case COMMENT_LIST_REQUEST:
        return { loading: true, comments: [] };
      case COMMENT_LIST_SUCCESS:
        return {
          loading: false,
          // pages: action.payload.pages,
          // page: action.payload.page,
          comments: action.payload,
        };
      case COMMENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const commentDetailsReducer = ( state = { comment: {} },action) => {
    switch (action.type) {
      case COMMENT_DETAILS_REQUEST:
        return { ...state, loading: true };
      case COMMENT_DETAILS_SUCCESS:
        return { loading: false, comment: action.payload };
      case COMMENT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const commentCreateReducer = (state = { comment: {} }, action) => {
    switch (action.type) {
        case COMMENT_CREATE_REQUEST:
          return { loading: true };
        case COMMENT_CREATE_SUCCESS:
          return { loading: false, success: true, comment: action.payload };
        case COMMENT_CREATE_FAIL:
          return { loading: false, error: action.payload };
        case COMMENT_CREATE_RESET:
          return { comment: {} };
        default:
          return state;
      }
  };

  export const commentUpdateReducer = (state = { comment: {} }, action) => {
    switch (action.type) {
      case COMMENT_UPDATE_REQUEST:
        return { loading: true };
      case COMMENT_UPDATE_SUCCESS:
        return { loading: false, success: true, comment: action.payload };
      case COMMENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case COMMENT_UPDATE_RESET:
        return { comment: {} };
      default:
        return state;
    }
  };
  