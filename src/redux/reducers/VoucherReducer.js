import {
    VOUCHER_CREATE_FAIL,
    VOUCHER_CREATE_REQUEST,
    VOUCHER_CREATE_RESET,
    VOUCHER_CREATE_SUCCESS,
    VOUCHER_UPDATE_FAIL,
    VOUCHER_UPDATE_REQUEST,
    VOUCHER_UPDATE_RESET,
    VOUCHER_UPDATE_SUCCESS,
    VOUCHER_DETAILS_FAIL,
    VOUCHER_DETAILS_REQUEST,
    VOUCHER_DETAILS_SUCCESS,
    VOUCHER_LIST_FAIL,
    VOUCHER_LIST_REQUEST,
    VOUCHER_LIST_SUCCESS,
    VOUCHER_DETAILS_STOP
  } from "../constants/Constants";
  
  export const voucherListReducer = (state = { vouchers: [] }, action) => {
    switch (action.type) {
      case VOUCHER_LIST_REQUEST:
        return { loading: true, vouchers: [] };
      case VOUCHER_LIST_SUCCESS:
        return {
          loading: false,
          vouchers: action.payload,
        };
      case VOUCHER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

  export const voucherDetailsReducer = ( state = { voucher: {} },action) => {
    switch (action.type) {
      case VOUCHER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case VOUCHER_DETAILS_SUCCESS:
        return { loading: false, success: true, voucher: action.payload};
      case VOUCHER_DETAILS_STOP:
        return {  ...state, success: false };
      case VOUCHER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
    
  export const voucherCreateReducer = (state = { voucher: {} }, action) => {
    switch (action.type) {
        case VOUCHER_CREATE_REQUEST:
          return { loading: true };
        case VOUCHER_CREATE_SUCCESS:
          return { loading: false, success: true, voucher: action.payload };
        case VOUCHER_CREATE_FAIL:
          return { loading: false, error: action.payload };
        case VOUCHER_CREATE_RESET:
          return { voucher: {} };
        default:
          return state;
      }
  };

  export const voucherUpdateReducer = (state = { voucher: {} }, action) => {
    switch (action.type) {
      case VOUCHER_UPDATE_REQUEST:
        return { loading: true };
      case VOUCHER_UPDATE_SUCCESS:
        return { loading: false, success: true, voucher: action.payload };
      case VOUCHER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case VOUCHER_UPDATE_RESET:
        return { voucher: {} };
      default:
        return state;
    }
  };