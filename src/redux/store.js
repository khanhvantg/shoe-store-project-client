import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginReducer,
  userRegisterReducer,
} from "./reducers/AuthReducer";
import {
  accountListReducer,
  accountUpdateReducer,
  accountDetailsReducer,
} from "./reducers/AccountReducer";
import {
  userListReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/UserReducer";
import {
  categoryCreateReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./reducers/CategoryReducer";
import {
  productCreateReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/ProductReducer";
import {
  imageCreateReducer,
  imageDetailsReducer,
  imageListReducer,
  imageUpdateReducer,
} from "./reducers/ImageReducer";
import {
  sizeCreateReducer,
  sizeDetailsReducer,
  sizeListReducer,
  sizeUpdateReducer,
} from "./reducers/SizeReducer";
import {
  lineItemCreateReducer,
  lineItemListReducer,
  lineItemRemoveReducer,
  lineItemUpdateReducer,
  wishListClearReducer,
} from "./reducers/WishListReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderListByUserIdReducer,
  orderUpdateReducer,
} from "./reducers/OrderReducer";
import {
  cartReducer,
  } from "./reducers/CartReducer";
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : null;

const reducer = combineReducers({
  //auth
  userLogin: loginReducer,
  userRegister: userRegisterReducer,
  //account
  accountList: accountListReducer,
  accountUpdate: accountUpdateReducer,
  accountDetail: accountDetailsReducer,
  //user
  userList: userListReducer,
  userDetail: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,
  //category
  categoryCreate: categoryCreateReducer,
  categoryDetail: categoryDetailsReducer,
  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  //product
  productCreate: productCreateReducer,
  productDetail: productDetailsReducer,
  productList: productListReducer,
  productUpdate: productUpdateReducer,
  //image
  imageCreate: imageCreateReducer,
  imageDetail: imageDetailsReducer,
  imageList: imageListReducer,
  imageUpdate: imageUpdateReducer,
  //size
  sizeCreate: sizeCreateReducer,
  sizeDetail: sizeDetailsReducer,
  sizeList: sizeListReducer,
  sizeUpdate: sizeUpdateReducer,
  //cart
  cart:cartReducer,
  //wishList
  lineItemCreate: lineItemCreateReducer,
  lineItemList:lineItemListReducer,
  lineItemRemove:lineItemRemoveReducer,
  lineItemUpdate:lineItemUpdateReducer,
  wishListClear:wishListClearReducer,
  //order
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailsReducer,
  orderUpdate: orderUpdateReducer,
  orderListByUserId: orderListByUserIdReducer,
});
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    //shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
