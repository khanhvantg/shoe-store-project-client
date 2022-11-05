import React, { useState, useEffect } from 'react'
import {
    Link
  } from "react-router-dom";
const Layout = () => {
    const [obj,setObj]=useState("");
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     set
    // }

    return (
        <div className="e-tabs mb-3 px-3">
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={()=>setObj("account")}><Link to="/manage/accounts" className="nav-link active">Accounts</Link></li>
                <li className="nav-item" onClick={()=>setObj("user")}><Link to="/manage/users" className="nav-link" >Users</Link></li>
                <li className="nav-item" onClick={()=>setObj("category")}><Link to="/manage/categories" className="nav-link" >Categories</Link></li>
                <li className="nav-item" onClick={()=>setObj("product")}><Link to="/manage/products" className="nav-link" >Products</Link></li>
                {/* //<li className="nav-item"><Link to="/manage/images" className="nav-link" onClick={setObj("images")}>Images</Link></li> */}
            </ul>
        </div>
  )
}

export default Layout
