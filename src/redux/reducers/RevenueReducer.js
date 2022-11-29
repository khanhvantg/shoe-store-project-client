import {
    REVENUE_LISTBYDATE_REQUEST,
    REVENUE_LISTBYDATE_SUCCESS,
    REVENUE_LISTBYDATE_FAIL,
    REVENUE_LISTBYDATE_RESET,
    REVENUE_LISTBYMONTH_REQUEST,
    REVENUE_LISTBYMONTH_SUCCESS,
    REVENUE_LISTBYMONTH_FAIL,
    REVENUE_LISTBYMONTH_RESET,
    PRODUCTBEST_LIST_REQUEST,
    PRODUCTBEST_LIST_SUCCESS,
    PRODUCTBEST_LIST_FAIL,
} from "../constants/Constants";

export const revenueOfDateReducer = (state = { revenue: {} }, action) => {
    switch (action.type) {
      case REVENUE_LISTBYDATE_REQUEST:
        return { ...state, loading: true };
      case REVENUE_LISTBYDATE_SUCCESS:
        return { loading: false, revenue: action.payload };
      case REVENUE_LISTBYDATE_FAIL:
        return { loading: false, error: action.payload };
      case REVENUE_LISTBYDATE_RESET:
        return { revenue: {} };
      default:
        return state;
    }
};

export const revenueOfMonthReducer = (state = { revenue: {}, revenueList: [] }, action) => {
    switch (action.type) {
      case REVENUE_LISTBYMONTH_REQUEST:
        return { ...state, loading: true };
      case REVENUE_LISTBYMONTH_SUCCESS:
        return { loading: false, revenue: action.payload, revenueList: action.payload.irevenueByMonthResponses };
      case REVENUE_LISTBYMONTH_FAIL:
        return { loading: false, error: action.payload };
      case REVENUE_LISTBYMONTH_RESET:
        return { revenue: {}, revenueList: [] };
      default:
        return state;
    }
};
