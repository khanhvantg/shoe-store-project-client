import './App.css';
import Header from './components/layout/Header'; //Include Header
import Footer from './components/layout/Footer'; //Include Footer
import Shop from './components/shop/Shop'
import ProductDetail from './components/product-detail/ProductDetail'
import Checkout from './components/check-out/Checkout'
import Cart from './components/cart/Cart'
import Login from './components/auths/Login'
import SignUp from './components/auths/SignUp'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ManageAccountsScreen from './screen/ManageAccountsScreen';
import ManageUserScreen from './screen/ManageUserScreen';
import ManageCategoryScreen from './screen/ManageCategoryScreen';
import ManageProductScreen from './screen/ManageProductScreen';
import ManageOrderScreen from './screen/ManageOrderScreen';
import ProfileScreen from './screen/ProfileScreen'
import Home from './components/home/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './components/orderHistory/Order';

import { useSelector } from "react-redux";
import React, { useState, useEffect, useDispatch } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./redux/actions/AuthAction";
import { getWishListById, removeLineItem } from './redux/actions/WishlistAction'
import AccountsScreen from './screen/manageScreen/AccountsScreen';
import PrivateRoute from "./PrivateRoute";
const App = () => {
  return (
    <div className="App">
        <ToastContainer/>
        <BrowserRouter>
          {/* {userInfo?<Header />:<></>} */}
          <Header />
          {/* <Header/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage/accounts" element={<ManageAccountsScreen/>}/>
            <Route path="/manage/users" element={<ManageUserScreen/>}/>
            <Route path="/manage/categories" element={<ManageCategoryScreen/>}/>
            <Route path="/manage/products" element={<ManageProductScreen/>}/>
            <Route path="/manage/orders" element={<ManageOrderScreen/>}/>
            {/* <Route path="/profile" element={<ProfileScreen/>}> </Route> */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/test" element={<AccountsScreen />} />
          </Routes>
          <Footer/>
          {/* {userInfo?<Footer/>:<></>} */}
        </BrowserRouter>
    </div>
  );
}

export default App;
