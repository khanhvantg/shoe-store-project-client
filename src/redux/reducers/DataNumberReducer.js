import {
    DATANUMBER_UPDATE_FAIL,
    DATANUMBER_UPDATE_REQUEST,
    DATANUMBER_UPDATE_RESET,
    DATANUMBER_UPDATE_SUCCESS,
    DATANUMBER_DETAILS_FAIL,
    DATANUMBER_DETAILS_REQUEST,
    DATANUMBER_DETAILS_SUCCESS,
    DATANUMBER_DETAILS_STOP,
  } from "../constants/Constants";
  
  export const dataNumberDetailsReducer = ( state = { dataNumber: {} },action) => {
    switch (action.type) {
      case DATANUMBER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case DATANUMBER_DETAILS_SUCCESS:
        return { loading: false, dataNumber: action.payload };
      case DATANUMBER_DETAILS_STOP:
        return {  ...state, dataNumber: {} };
      case DATANUMBER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const dataNumberUpdateReducer = (state = { dataNumber: {} }, action) => {
    switch (action.type) {
      case DATANUMBER_UPDATE_REQUEST:
        return { loading: true };
      case DATANUMBER_UPDATE_SUCCESS:
        return { loading: false, success: true, dataNumber: action.payload };
      case DATANUMBER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case DATANUMBER_UPDATE_RESET:
        return { dataNumber: {} };
      default:
        return state;
    }
  };