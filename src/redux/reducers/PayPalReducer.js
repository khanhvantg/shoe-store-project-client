import {
    PAYPAL_LIST_REQUEST,
    PAYPAL_LIST_SUCCESS,
    PAYPAL_LIST_FAIL,
    PAYPAL_DETAIL_REQUEST,
    PAYPAL_DETAIL_SUCCESS,
    PAYPAL_DETAIL_FAIL,
    PAYPAL_DETAIL_RESET,
    PAYPAL_REFUND_REQUEST,
    PAYPAL_REFUND_SUCCESS,
    PAYPAL_REFUND_FAIL,
    PAYPAL_REFUND_RESET
  } from "../constants/Constants";
  
  
  export const paypalTransactionReducer = (state = { money: [] }, action) => {
      switch (action.type) {
        case PAYPAL_LIST_REQUEST:
          return { loading: true,  money: []};
        case PAYPAL_LIST_SUCCESS:
          return { loading: false, money: action.payload };
        case PAYPAL_LIST_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    };
  
    export const paypalBalanceReducer = (state = { balance: [] }, action) => {
      switch (action.type) {
        case PAYPAL_DETAIL_REQUEST:
          return { loading: true,  balance: []};
        case PAYPAL_DETAIL_SUCCESS:
          return { loading: false, balance: action.payload.balances[0].total_balance };
        case PAYPAL_DETAIL_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    };
  
    // export const paypalUpdateReducer = (state = { money: [] }, action) => {
    //   switch (action.type) {
    //     case PAYPAL_UPDATE_REQUEST:
    //       return { loading: true };
    //     case PAYPAL_UPDATE_SUCCESS:
    //       return { loading: false, success: true, money: action.payload };
    //     case PAYPAL_UPDATE_FAIL:
    //       return { loading: false, error: action.payload };
    //     case PAYPAL_UPDATE_RESET:
    //       return { money: [] };
    //     default:
    //       return state;
    //   }
    // };

    export const paypalRefundReducer = (state = { money: [] }, action) => {
      switch (action.type) {
          case PAYPAL_REFUND_REQUEST:
            return { loading: true };
          case PAYPAL_REFUND_SUCCESS:
            return { loading: false, success: true, money: action.payload };
          case PAYPAL_REFUND_FAIL:
            return { loading: false, error: action.payload };
          case PAYPAL_REFUND_RESET:
            return { money: [] };
          default:
            return state;
        }
    };