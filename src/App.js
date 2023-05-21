import './App.css';
import Header from './components/layout/Header'; //Include Header
import Footer from './components/layout/Footer'; //Include Footer
import Shop from './components/shop/Shop'
import ProductMain1 from './components/shop/ProductMain1'
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
import React from 'react'
import PrivateRoute from "./PrivateRoute";
import ManageRevenueYearScreen from './screen/ManageRevenueYearScreen';
import ManageRevenueMonthScreen from './screen/ManageRevenueMonthScreen';
import ManageRevenueDayScreen from './screen/ManageRevenueDayScreen';
import Home1 from './components/home/Home1';
import ManageVoucherScreen from './screen/ManageVoucherScreen';
import Thanks from './components/check-out/Thanks';
import PrivateRouteCheckOut from './PrivateRouteCheckOut';
import ManagePayPalTransactionScreen from './screen/ManagePayPalTransactionScreen';
import ForgetPassword from './components/auths/ForgetPassword';
import Invoice from './components/invoice/Invoice';

import MessengerCustomerChat from 'react-messenger-customer-chat';
import PrivateRouteForAdmin from './PrivateRouteForAdmin';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
const App = () => {
  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <ToastContainer
        className="toast-position"
      />
      <BrowserRouter>
        <Header />
        <div className="main">
          <Routes forceRefresh={true}>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/order-detail/:id"
              element={
                <PrivateRoute >
                  <Invoice />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            {/* <Route path="/shop" element={<Shop />} /> */}
            <Route path="/shop" element={<ProductMain1 />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/checkout" element={<PrivateRouteCheckOut><Checkout /></PrivateRouteCheckOut>} /> */}
            <Route path="/thank" element={<Thanks />} />
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
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/manage/accounts" element={<ManageAccountsScreen />} />
            <Route
              path="/manage/paypal"
              element={
                <PrivateRouteForAdmin>
                  <ManagePayPalTransactionScreen />
                </PrivateRouteForAdmin>
              }
            />
            <Route
              path="/manage/users"
              element={
                <PrivateRouteForAdmin><ManageUserScreen /></PrivateRouteForAdmin>
              }
            />
            <Route
              path="/manage/categories"
              element={<PrivateRouteForAdmin><ManageCategoryScreen /></PrivateRouteForAdmin>} />
            <Route
              path="/manage/products"
              element={<PrivateRouteForAdmin><ManageProductScreen /></PrivateRouteForAdmin>} />
            <Route
              path="/manage/vouchers"
              element={<PrivateRouteForAdmin><ManageVoucherScreen /></PrivateRouteForAdmin>} />
            <Route
              path="/manage/orders"
              element={<PrivateRouteForAdmin><ManageOrderScreen /></PrivateRouteForAdmin>} />
            <Route
              path="/manage/orders/page/:page"
              element={<PrivateRouteForAdmin><ManageOrderScreen /></PrivateRouteForAdmin>} />
            <Route
              path="/manage/y-revenue"
              element={<PrivateRouteForAdmin><ManageRevenueYearScreen /></PrivateRouteForAdmin>} />
            <Route
              path="/manage/m-revenue"
              element={<PrivateRouteForAdmin><ManageRevenueMonthScreen /></PrivateRouteForAdmin>} />
            <Route
              path="/manage/d-revenue"
              element={<PrivateRouteForAdmin><ManageRevenueDayScreen /></PrivateRouteForAdmin>} />

            {/* <Route path="/manage/paypal" element={<ManagePayPalTransactionScreen/>}/>
            <Route path="/manage/users" element={<ManageUserScreen/>}/>
            <Route path="/manage/categories" element={<ManageCategoryScreen/>}/>
            <Route path="/manage/products" element={<ManageProductScreen/>}/>
            <Route path="/manage/vouchers" element={<ManageVoucherScreen/>}/>
            <Route path="/manage/orders" element={<ManageOrderScreen/>}/>
            <Route path="/manage/y-revenue" element={<ManageRevenueYearScreen/>} />
            <Route path="/manage/m-revenue" element={<ManageRevenueMonthScreen/>} />
            <Route path="/manage/d-revenue" element={<ManageRevenueDayScreen/>} /> */}
          </Routes>
        </div>
        <Footer />
        <MessengerCustomerChat
          pageId="108239868917747"
          appId="3497014053916132"
          themeColor={'#00DDEB'}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
