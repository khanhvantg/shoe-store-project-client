import {
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_DETAIL_FAIL,
  ACCOUNT_DETAIL_RESET,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_RESET
} from "../constants/Constants";


export const accountListReducer = (state = { accounts: [] }, action) => {
    switch (action.type) {
      case ACCOUNT_LIST_REQUEST:
        return { loading: true,  accounts: []};
      case ACCOUNT_LIST_SUCCESS:
        return { loading: false, accounts: action.payload };
      case ACCOUNT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const accountDetailsReducer = (state = { account: {} }, action) => {
    switch (action.type) {
      case ACCOUNT_DETAIL_REQUEST:
        return { ...state, loading: true };
      case ACCOUNT_DETAIL_SUCCESS:
        return { loading: false, account: action.payload };
      case ACCOUNT_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      case ACCOUNT_DETAIL_RESET:
        return { account: {} };
      default:
        return state;
    }
  };

  export const accountUpdateReducer = (state = { account: {} }, action) => {
    switch (action.type) {
      case ACCOUNT_UPDATE_REQUEST:
        return { loading: true };
      case ACCOUNT_UPDATE_SUCCESS:
        return { loading: false, success: true, account: action.payload };
      case ACCOUNT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case ACCOUNT_UPDATE_RESET:
        return { account: {} };
      default:
        return state;
    }
  };