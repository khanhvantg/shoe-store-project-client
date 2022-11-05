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

import ProfileScreen from './screen/ProfileScreen'
import HomeScreen from './screen/HomeScreen'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className="App">
        <ToastContainer/>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/manage/accounts" element={<ManageAccountsScreen/>}/>
            <Route path="/manage/users" element={<ManageUserScreen/>}/>
            <Route path="/manage/categories" element={<ManageCategoryScreen/>}/>
            <Route path="/manage/products" element={<ManageProductScreen/>}/>

            <Route path="/profile" element={<ProfileScreen/>}> </Route>
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
