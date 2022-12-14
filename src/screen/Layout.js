import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    useParams
  } from "react-router-dom";
  import './Layout.css'
const Layout = ({active}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const nameUrl = window.location.href.toString();
    let arrayStrig = nameUrl.split("/");
    const f = arrayStrig[arrayStrig.length-1];

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() =>{
        if(userInfo){
            for (let i in userInfo.roles) {
                if(userInfo.roles[i]==="ROLE_ADMIN") {
                    setIsAdmin(true);
                    break;
                }
            }
        } else {
            setIsAdmin(false);
        }
    },[userInfo])
    return (
        <nav id="sidebar" className={active?"active":""}>
            <div className="sidebar-header">
                <h5>Sales</h5>
                <hr></hr>
            </div>
            <ul className="list-unstyled" style={{paddingLeft:20}}>
                <li className={f==="d-revenue"?"nav-item active":"nav-item"} ><Link to="/manage/d-revenue" className="nav-link">Statistics By Day</Link></li>
                <li className={f==="m-revenue"?"nav-item active":"nav-item"} ><Link to="/manage/m-revenue" className="nav-link">Statistics By Month</Link></li>
                <li className={f==="y-revenue"?"nav-item active":"nav-item"} ><Link to="/manage/y-revenue" className="nav-link">Monthly Revenue By Year</Link></li>
            </ul>
            <div className="sidebar-header">
                <h5>Dashboard</h5>
                <hr></hr>
            </div>
            <ul className="list-unstyled" style={{paddingLeft:20}}>
                {isAdmin?
                    <li className={f==="accounts"?"nav-item active":"nav-item"} ><Link to="/manage/accounts" className="nav-link">Accounts</Link></li>
                    :
                    <></>
                }
                <li className={f==="users"?"nav-item active":"nav-item"} ><Link to="/manage/users" className="nav-link">Users</Link></li>
                <li className={f==="categories"?"nav-item active":"nav-item"} ><Link to="/manage/categories" className="nav-link" >Categories</Link></li>
                <li className={f==="products"?"nav-item active":"nav-item"} ><Link to="/manage/products" className="nav-link">Products</Link></li>
                <li className={f==="orders"?"nav-item active":"nav-item"} ><Link to="/manage/orders" className="nav-link">Orders</Link></li>
            </ul>
        </nav>
        // <div className="e-tabs mb-3 px-3">
        //     <ul className="nav nav-tabs">
        //         <li className="nav-item" onClick={()=>setObj("account")}><Link to="/manage/accounts" className={obj==="account"?"nav-link active":"nav-link"}>Accounts</Link></li>
        //         <li className="nav-item" onClick={()=>setObj("user")}><Link to="/manage/users" className={obj==="user"?"nav-link active":"nav-link"}>Users</Link></li>
        //         <li className="nav-item" onClick={()=>setObj("category")}><Link to="/manage/categories" className={obj==="category"?"nav-link active":"nav-link"} >Categories</Link></li>
        //         <li className="nav-item" onClick={()=>setObj("product")}><Link to="/manage/products" className={obj==="product"?"nav-link active":"nav-link"}>Products</Link></li>
        //         <li className="nav-item" onClick={()=>setObj("order")}><Link to="/manage/orders" className={obj==="order"?"nav-link active":"nav-link"}>Orders</Link></li>
        //         {/* //<li className="nav-item"><Link to="/manage/images" className="nav-link" onClick={setObj("images")}>Images</Link></li> */}
        //     </ul>
        // </div>
  )
}

export default Layout
