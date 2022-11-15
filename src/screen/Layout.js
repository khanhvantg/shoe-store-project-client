import React, { useState, useEffect } from 'react'
import {
    Link
  } from "react-router-dom";
const Layout = () => {
    const [obj,setObj]=useState("");
    // useEffect (()=>{

    // },[obj])
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     set
    // }

    return (
        <div className="e-tabs mb-3 px-3">
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={()=>setObj("account")}><Link to="/manage/accounts" className={obj==="account"?"nav-link active":"nav-link"}>Accounts</Link></li>
                <li className="nav-item" onClick={()=>setObj("user")}><Link to="/manage/users" className={obj==="user"?"nav-link active":"nav-link"}>Users</Link></li>
                <li className="nav-item" onClick={()=>setObj("category")}><Link to="/manage/categories" className={obj==="category"?"nav-link active":"nav-link"} >Categories</Link></li>
                <li className="nav-item" onClick={()=>setObj("product")}><Link to="/manage/products" className={obj==="product"?"nav-link active":"nav-link"}>Products</Link></li>
                <li className="nav-item" onClick={()=>setObj("order")}><Link to="/manage/orders" className={obj==="order"?"nav-link active":"nav-link"}>Orders</Link></li>
                {/* //<li className="nav-item"><Link to="/manage/images" className="nav-link" onClick={setObj("images")}>Images</Link></li> */}
            </ul>
        </div>
  )
}

export default Layout
