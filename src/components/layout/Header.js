import { Link, useNavigate, Navigate  } from "react-router-dom";
import "./Header.css";
import { logout } from "../../redux/actions/AuthAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from '../../redux/actions/CartAction'
import { getWishListById, removeLineItem } from '../../redux/actions/WishlistAction'
import {
    LINE_ITEM_LIST_RESET,
} from '../../redux/constants/Constants'
import { color } from "highcharts";
import { getDataNumberByName } from "../../redux/actions/DataNumberAction";
const Header = () => {
    const nameUrl = window.location.href.toString();
    let arrayStrig = nameUrl.split("/");
    const f = arrayStrig[3].split("?")[0];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const lineItemList = useSelector((state) => state.lineItemList);
    const { loading, error, lineItems} = lineItemList;
    const dataNumberDetail = useSelector((state) => state.dataNumberDetail);
    const { dataNumber } = dataNumberDetail;
    //const lineItems = wishList.lineItems;

    const userLogin = useSelector((state) => state.userLogin);
    const { success, userInfo } = userLogin;
    const amountItem = lineItems&&lineItems.reduce(function (result, item) {
        return result + Number(item.amount);
      },0);
    useEffect(() =>{
        if(userInfo){
            dispatch(getWishListById());
            dispatch(getDataNumberByName());
            for (let i in userInfo.roles) {
                if(userInfo.roles[i]==="ROLE_ADMIN" || userInfo.roles[i]==="ROLE_MODERATOR") {
                    setIsAdmin(true);
                    break;
                }
            }
        } else {
            dispatch({type: LINE_ITEM_LIST_RESET})
            setIsAdmin(false);
        }
    },[dispatch,userInfo])

    const logoutHandler = () => {
      dispatch(logout());
    };
    const handleRemoveItem = (id) => {
        dispatch(removeLineItem(id));
    }
    return (
        <div className="header box-shadow">
        <nav className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation flex-row-reverse" id="navbar" style={{height: "79px"}}>
            <div className="" style={{width: "125px", paddingRight:"0px"}}>
                <ul className="top-menu list-inline mb-0 d-lg-block" id="top-menu">
                    {/* <li className="dropdown cart-nav dropdown-slide list-inline-item">
                        <a className="search_toggle" id="search-icon" data-toggle="dropdown" data-hover="dropdown">
                            <i className="tf-ion-android-search"></i>
                        </a>
                        <div className="dropdown-menu cart-dropdown">
                            <input></input>
                        </div>
                    </li> */}
                    <li className="dropdown cart-nav dropdown-slide list-inline-item">
                    
                        <Link reloadDocument={true}  to="/cart" data-hover="dropdown">
                            <i className="tf-ion-android-cart">
                            {/* <sup style={{fontSize: "15px"}}>{amountItem}</sup> */}
                            </i>
                        </Link>
                        <div className="dropdown-menu cart-dropdown">
                        {lineItems&&lineItems.sort((a,b)=>(a.id-b.id)).map(item=>(
                                <div className="media">
                                <Link reloadDocument={true}  to={`/product/${item.product.id}`}>
                                    <img className="media-object img- mr-3" src={item.product.images.sort((a,b)=>(a.id-b.id))[0]?.link} alt="image" />
                                </Link>
                                <div className="media-body">
                                    <h6>{item.product.name}</h6>
                                    <div className="cart-price">
                                        <span>{item.amount} x </span>
                                        <span>${item.product.price} = </span>
                                        <span>${item.total}</span>
                                    </div>
                                    <div className="cart-price">
                                        <span>Size: {item.size}UK</span>
                                        
                                    </div>
                                </div>
                                {/* <div className="text-center"> */}
                                <i className="tf-ion-android-delete" style={{cursor: "pointer", marginTop: "19px"}} onClick={()=>handleRemoveItem(item.id)} ></i>
                                {/* </div> */}
{/*     
                                <a className="remove circle" onClick={()=>handleRemoveItem(item.id)}><i className="tf-ion-close"></i></a> */}
                            </div>
                            ))}
                            <div className="cart-summary">
                                {/* <span className="h6">Total</span>
                                <span className="total-price h6">$1799.00</span> */}
                            {lineItems&&lineItems.length>0&&
                                <div className="text-center cart-buttons mt-3">
                                    <Link reloadDocument={true}  to="/checkout" className="button-1 mr-1">Check Out</Link>
                                    <Link reloadDocument={true}  to="/cart" className="button-1 ml-1">View Cart</Link>
                                </div>||<div className="text-center">
                                            <img className="w-100 h-100" src="/assets/images/empty-cart.jpg"/>
                                        </div>}
                            </div>
                        </div>
                        {amountItem>0&&
                        <li className="list-inline-item">
                            <sup>
                                <sup>
                                    <span className="" style={{
                                            fontSize: "15px",
                                            backgroundColor: "red",
                                            color: "white",
                                            marginLeft:"-12px",
                                            borderRadius:"20px",
                                            padding: "0px 5px",
                                        }}>
                                        {amountItem}
                                    </span>
                                    
                                </sup>
                            </sup>
                            
                    </li>}
                    </li>
                    
                    <li className="dropdown cart-nav dropdown-slide list-inline-item">
                        <Link reloadDocument={true}  to="/profile" data-hover="dropdown">
                            <i className="tf-ion-ios-person"></i>
                        </Link>
                        <div className="dropdown-menu cart-dropdown">
                            <div className="cart-summary">
                                {/* <span className="h6">Total</span>
                                <span className="total-price h6">$1799.00</span> */}
                        
                                <div className="text-center cart-buttons mt-3">
                                    {   isAdmin?
                                        <Link reloadDocument={true}  to="/manage/paypal" className="button-1 mr-3">Manage</Link>
                                        : userInfo ?
                                        <Link reloadDocument={true}  to="/profile" className="button-1 mr-3">Profile</Link>
                                        : <></>
                                    }
                                    { userInfo ? 
                                        <Link to={{ pathname:"/login"}} onClick={logoutHandler} className="button-1 ml-3">Logout</Link>
                                        :
                                        <Link to={{ pathname:"/login"}} className="button-1">Login</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    
                    </li>
                    {/* <li className="list-inline-item" style={{width: 35}}>
                        <Link reloadDocument={true}  to="/profile" style={{width: "35px"}} >
                            <i className="tf-ion-ios-person mr-3"></i>
                        </Link>
                    </li> */}
                </ul>
            </div>
            <div className="container">
                <Link reloadDocument={true}  className="navbar-brand" to={{ pathname: "/"}}>
                    {/* <img src="assets/images/Untitled.png" style={{width:"30px", height:"30px"}}/> */}
                    <h4 className="font-weight-bold">Shoe Store</h4>
                </Link>
                
                <button style={{margin: "0 15px 0 1rem"}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
                    aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
  
                <div className="collapse navbar-collapse" id="main-navbar" style={{fontSize: "20px"}} style={{background: "white"}}>
                <ul className="navbar-nav mx-auto text-center">
                    <li className={f===""?"nav-item active":"nav-item"}>
                        <Link reloadDocument={true}  className="nav-link" to={{ pathname: "/"}}>Home</Link>
                    </li>
                    <li className={f==="shop"||f==="product"?"nav-item active":"nav-item"}>
                        <Link  className="nav-link" to="/shop?page=1" reloadDocument={true}>Shoes</Link>
                    </li>
                    {
                        userInfo &&
                        <li className={(f==="order"||f==="manage")?"nav-item active":"nav-item"}>
                            <Link reloadDocument={true}  className="nav-link" to={isAdmin?"/manage/paypal":"/order"}>{isAdmin?"Manage":"Order History"}</Link>
                        </li>
                    }
                    {/* {
                        !isAdmin&&userInfo &&
                        <li className={f==="order"?"nav-item active":"nav-item"}>
                            <Link reloadDocument={true}  className="nav-link" to="/order">Order History</Link>
                        </li>
                        // :<></>
                    } */}
                    {/* {
                        isAdmin &&
                            <li className={f==="manage"?"nav-item active":"nav-item"}>
                                <Link reloadDocument={true}  className="nav-link" to={{ pathname: "/manage/paypal"}}>Manage</Link>
                            </li>  
                    } */}
                </ul>
                </div>
            </div>
        </nav>
        </div>
    )
}
export default Header