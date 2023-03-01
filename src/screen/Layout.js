import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    useParams
  } from "react-router-dom";
import AccountMain from '../components/dashboard/account/AccountMain';
  import './Layout.css'
const Layout = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined
      });
    
    const [isAdmin, setIsAdmin] = useState(false);
    const nameUrl = window.location.href.toString();
    let arrayStrig = nameUrl.split("/");
    const f = arrayStrig[arrayStrig.length-1];

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [active, setActive] =useState(false);
    const handle = useCallback(() => {
        if(!active) {
            setActive(true);
        }
        else setActive(false);
    }, [active]);
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
        if (windowSize.width>768){
            setActive(false);
        }
        const handleResize = () => setWindowSize({ width: window.innerWidth });
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[userInfo, windowSize.width])
    console.log(active)
    return (
        <>
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
        {windowSize.width<768&&(
            <nav className="navbar navbar1-expand-lg navbar1-light bg-light">
                <div className="container-fluid">
                    <button type="button" id="sidebarCollapse" className="btn btn-outline-secondary" onClick={handle}>
                        {!active?<i className="tf-ion-ios-arrow-right" style={{color:"black"}}></i>:
                            <i className="tf-ion-ios-arrow-left" style={{color:"black"}}></i>}
                    </button>
                </div>
            </nav>)
        }
        </>
  )
}

export default Layout
