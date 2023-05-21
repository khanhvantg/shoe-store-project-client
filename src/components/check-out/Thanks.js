import React from 'react'
import axios from '../../redux/actions/axios'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { Link } from 'react-router-dom';

const Thanks = () => {
    return (
        <div className="" style={{ backgroundColor: "#99ffff" }}>
            <div className="text-center">
                <span className="h1" style={{ fontFamily: "Brush Script MT", fontSize: "200px" }}>Thank You</span>
                <h2 className="mt-3">Your purchase is truly appreciated!</h2>

                <h2 className="mt-3">Please check your email for order code and your invoce</h2>
            </div>
            <div className="text-center" style={{ backgroundColor: "#00e6e6", borderRadius: "20px", width: "450px", marginLeft: "auto", marginRight: "auto" }}>
                <p className="text-md mt-3 text-white">Anything questions?</p>
                <p className="text-md mt-3 text-white">Email us to khoaluantotnghiep2223@gmail.com</p>
                <p className="text-md mt-3 text-white">or call us at (+84) 94-529-1058</p>
            </div>
            <div className="text-center cart-buttons mt-3" style={{ padding: "10px 0px 50px 0px" }}>
                <Link to="/order" className="button-1 mb-3 mr-5">Order History</Link>

                <Link to="/shop?page=1" className="button-1 mb-3 ml-5">Shop Continue</Link>
            </div>
        </div>
    )
}

export default Thanks
