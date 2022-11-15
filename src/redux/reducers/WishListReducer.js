import {
    LINE_ITEM_CREATE_FAIL,
    LINE_ITEM_CREATE_REQUEST,
    LINE_ITEM_CREATE_RESET,
    LINE_ITEM_CREATE_SUCCESS,
    LINE_ITEM_UPDATE_FAIL,
    LINE_ITEM_UPDATE_REQUEST,
    LINE_ITEM_UPDATE_RESET,
    LINE_ITEM_UPDATE_SUCCESS,
    LINE_ITEM_DETAILS_FAIL,
    LINE_ITEM_DETAILS_REQUEST,
    LINE_ITEM_DETAILS_SUCCESS,
    LINE_ITEM_LIST_FAIL,
    LINE_ITEM_LIST_REQUEST,
    LINE_ITEM_LIST_SUCCESS,
    LINE_ITEM_DELETE_REQUEST,
    LINE_ITEM_DELETE_SUCCESS,
    LINE_ITEM_DELETE_FAIL,
    LINE_ITEM_REMOVE_REQUEST,
    LINE_ITEM_REMOVE_SUCCESS,
    LINE_ITEM_REMOVE_FAIL,
  } from "../constants/Constants";

  export const lineItemListReducer = (state = { user: {}, lineItems: [] }, action) => {
    switch (action.type) {
      case LINE_ITEM_LIST_REQUEST:
        return { loading: true,user:{}, lineItems: [] };
      case LINE_ITEM_LIST_SUCCESS:
        return {loading: false, user: action.payload.user, lineItems: action.payload.lineItems};
      case LINE_ITEM_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const lineItemCreateReducer = (state = { lineItem: {} }, action) => {
    switch (action.type) {
        case LINE_ITEM_CREATE_REQUEST:
          return { loading: true };
        case LINE_ITEM_CREATE_SUCCESS:
          return { loading: false, success: true, lineItem: action.payload };
        case LINE_ITEM_CREATE_FAIL:
          return { loading: false, error: action.payload };
        case LINE_ITEM_CREATE_RESET:
          return { product: {} };
        default:
          return state;
      }
  };

  export const lineItemRemoveReducer = (state = { }, action) => {
    switch (action.type) {
        case LINE_ITEM_REMOVE_REQUEST:
          return { loading: true };
        case LINE_ITEM_REMOVE_SUCCESS:
          return { loading: false, success: true, lineItem: action.payload };
        case LINE_ITEM_REMOVE_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
  };

  export const wishListClearReducer = (state = { }, action) => {
    switch (action.type) {
        case LINE_ITEM_DELETE_REQUEST:
          return { loading: true };
        case LINE_ITEM_DELETE_SUCCESS:
          return { loading: false, success: true };
        case LINE_ITEM_DELETE_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
  };