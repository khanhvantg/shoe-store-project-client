import React, { useState, useEffect } from 'react'
import {
    Link,
    useParams
  } from "react-router-dom";
const Layout = ({active}) => {
    // const [article, setArticle] = useState(null)
    // const { topicId } = useParams()

//   useEffect(() => {
//     getArticle(topicId)
//       .then(setUser)
//   }, [topicId])
    //const [obj,setObj]=useState("");
    // useEffect (()=>{

    // },[obj])
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     set
    // }
    //const [activeItem, setActiveItem] =useState([]);
    // console.log("a",topicId)
    // const handle = useCallback(() => {
    //     if(!activeItem) {
    //         setActive(true);
    //     }
    //     else setActive(false);
    // }, [activeItem]);
    return (
        <nav id="sidebar" className={active?"active":""}>
            <ul class="list-unstyled">
                <li className="nav-item"><Link to="/manage/accounts" className="nav-link">Accounts</Link></li>
                <li className="nav-item"><Link to="/manage/users" className="nav-link">Users</Link></li>
                <li className="nav-item"><Link to="/manage/categories" className="nav-link" >Categories</Link></li>
                <li className="nav-item"><Link to="/manage/products" className="nav-link">Products</Link></li>
                <li className="nav-item"><Link to="/manage/orders" className="nav-link">Orders</Link></li>
                {/* {
                    <li className="nav-item"><Link to="/manage/users" className="nav-link">Users</Link></li>
                    // activeItem&&activeItem.map((item, index)=>{
                    //     <li className="nav-item">
                    //         <Link to={item.url} className="nav-link">"aa"</Link>
                    //     </li>
                    // })
                } */}
                {/* <li className="nav-item"><Link to="/manage/accounts" className="nav-link">Accounts</Link></li>
                <li className="nav-item"><Link to="/manage/users" className="nav-link">Users</Link></li>
                <li className="nav-item"><Link to="/manage/categories" className="nav-link" >Categories</Link></li>
                <li className="nav-item"><Link to="/manage/products" className="nav-link">Products</Link></li>
                <li className="nav-item"><Link to="/manage/orders" className="nav-link">Orders</Link></li> */}
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
