import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="" style={{ backgroundColor: "white" }}>
        <div className="text-center">
            <span className="h1" style={{fontSize: "400px", color: "gray"}}>404</span>
            <h1 style={{marginTop: "-79px", fontSize: "50px"}}>PAGE NOT FOUND</h1>
        </div>
        <div className="text-center cart-buttons mt-3" style={{ padding: "10px 0px 50px 0px" }}>
            <Link reloadDocument={true}  to="/" className="button-1 mb-3 mr-5">Go Home</Link>
            <Link reloadDocument={true}  to="/shop?page=1" className="button-1 mb-3 ml-5">Go Shop</Link>
        </div>
    </div>
  )
}

export default NotFoundPage
