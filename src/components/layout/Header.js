import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { logout } from "../../redux/actions/AuthAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from '../../redux/actions/CartAction'
import { getWishListById, removeLineItem } from '../../redux/actions/WishlistAction'
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const lineItemList = useSelector((state) => state.lineItemList);
    const { loading, error, lineItems} = lineItemList;

    const userLogin = useSelector((state) => state.userLogin);
    const { success, userInfo } = userLogin;
    useEffect(() => async () =>{
        if(userInfo){
            dispatch(getWishListById());
        }
    },[dispatch,navigate,userInfo])

    lineItems.sort((a,b)=>(a.id-b.id))

    const logoutHandler = () => {
      dispatch(logout());
    };

    const handleRemoveItem = (id) => {
        dispatch(removeLineItem(id));

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation flex-row-reverse" id="navbar">
            <div className="" style={{width: 165}}>
                <ul className="top-menu list-inline mb-0 d-lg-block" id="top-menu">
                    <li className="dropdown cart-nav dropdown-slide list-inline-item">
                        <a className="search_toggle" id="search-icon" data-toggle="dropdown" data-hover="dropdown">
                            <i className="tf-ion-android-search"></i>
                        </a>
                        <div className="dropdown-menu cart-dropdown">
                            <input></input>
                        </div>
                    </li>
                    <li className="dropdown cart-nav dropdown-slide list-inline-item">
                        <Link to="/cart" className="dropdown-toggle cart-icon" data-hover="dropdown">
                            <i className="tf-ion-android-cart"></i>
                        </Link>
                        <div className="dropdown-menu cart-dropdown">
                        {lineItems&&lineItems.map(item=>(
                                <div className="media">
                                <a href="/product-single">
                                    <img className="media-object img- mr-3" src={item.product.images[0]?.link} alt="image" />
                                </a>
                                <div className="media-body">
                                    <h6>{item.product.name}</h6>
                                    <div className="cart-price">
                                        <span>{item.amount} x </span>
                                        <span>{item.product.price} =</span>
                                        <span>{item.total}</span>
                                    </div>
                                </div>
                                <a className="remove circle" onClick={()=>handleRemoveItem(item.id)}><i className="tf-ion-close"></i></a>
                            </div>
                            ))}
                            <div className="cart-summary">
                                <span className="h6">Total</span>
                                <span className="total-price h6">$1799.00</span>
                        
                                <div className="text-center cart-buttons mt-3">
                                <Link to="/cart" className="btn btn-small btn-transparent btn-block">View Cart</Link>
                                <a href="#" className="btn btn-small btn-transparent btn-block">Checkout</a>
                                </div>
                            </div>
                        </div>
                    
                    </li>
                    <li className="list-inline-item" style={{width: 35}}>
                        <Link to="/profile" style={{width: "35px"}} >
                            <i className="tf-ion-ios-person mr-3"></i>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="container">
                <Link className="navbar-brand font-weight-bold" to={{ pathname: "/"}}>E-Shop</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
                    aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
  
                <div className="collapse navbar-collapse" id="main-navbar">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: "/"}}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About Us</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: "/shop"}}>Shoes</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: "/login"}}>Login Page</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: "/signup"}}>SignUp Page</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: "/login"}} onClick={logoutHandler}>Logout</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: "/manage/accounts"}}>Manage</Link>
                    </li>
                
                    {/* <li className="nav-item dropdown dropdown-slide">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown4" role="button" data-delay="350"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Pages
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Blog Single</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">404 Page</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                    </li> */}

                    {/* <li className="nav-item dropdown dropdown-slide">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-delay="350"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Shop
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                        <li><Link to={{ pathname: "/shop"}}>Shop</Link></li>
                        <li><Link to={{ pathname: "/single-product"}}>Product Details</Link></li>
                        <li><Link to={{ pathname: "/checkout"}}>Checkout</Link></li>
                        <li><Link to={{ pathname: "/cart"}}>Cart</Link></li>
                    </ul>
                    </li>

                 */}
                    <li className="nav-item dropdown dropdown-slide">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown5" role="button" data-delay="350"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Account
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                        {userInfo ? 
                        (<li><Link onClick={logoutHandler} to={{ pathname: "/login"}}>Logout</Link></li>):
                        (<li><Link to={{ pathname: "/login"}}>Login Page</Link></li>)}
                        <li><Link to={{ pathname: "/signup"}}>SignUp Page</Link></li>
                    </ul>
                    </li>
                    {/* {userInfo ? (
                        <li className="nav-item dropdown dropdown-slide">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown5" role="button" data-delay="350"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Manage
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                    
                            <li><Link to={{ pathname: "/manage/accounts"}}>account</Link></li>
                            <li><Link to={{ pathname: "/forgot-password"}}>Forgot Password</Link></li>
                        </ul>
                        </li>
                    ): (<></>)} */}
                </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header