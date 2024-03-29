import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_CHECK_FAIL,
    ORDER_CHECK_REQUEST,
    ORDER_CHECK_RESET,
    ORDER_CHECK_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_RESET,
    ORDER_UPDATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LISTBYUSER_FAIL,
    ORDER_LISTBYUSER_REQUEST,
    ORDER_LISTBYUSER_SUCCESS,
  } from "../constants/Constants";
  
  export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true, orders: [] };
      case ORDER_LIST_SUCCESS:
        return {loading: false, orders: action.payload};
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const orderListByUserIdReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LISTBYUSER_REQUEST:
        return { loading: true, orders: [] };
      case ORDER_LISTBYUSER_SUCCESS:
        return {loading: false, orders: action.payload};
      case ORDER_LISTBYUSER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const orderDetailsReducer = ( state = { order: {}, lineItems: [] },action) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return { ...state, loading: true, lineItems: [] };
      case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload, lineItems: action.payload.lineItemOrders };
      case ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const orderCreateReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
          return { loading: true };
        case ORDER_CREATE_SUCCESS:
          return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
          return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
          return { order: {} };
        default:
          return state;
      }
  };

  export const orderCheckReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_CHECK_REQUEST:
          return { loading: true };
        case ORDER_CHECK_SUCCESS:
          return { loading: false, success: true, order: action.payload };
        case ORDER_CHECK_FAIL:
          return { loading: false, error: action.payload };
        case ORDER_CHECK_RESET:
          return { order: {} };
        default:
          return state;
      }
  };

  export const orderUpdateReducer = (state = { order: {} }, action) => {
    switch (action.type) {
      case ORDER_UPDATE_REQUEST:
        return { loading: true };
      case ORDER_UPDATE_SUCCESS:
        return { loading: false, success: true, order: action.payload };
      case ORDER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_UPDATE_RESET:
        return { order: {} };
      default:
        return state;
    }
  };
  