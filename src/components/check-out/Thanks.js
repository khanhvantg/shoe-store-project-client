import React from 'react'
import axios from '../../redux/actions/axios'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { Link } from 'react-router-dom';

const Thanks = () => {
  
  const username = 'AXap4VJ7Ie8T2UPEEQYQLoYR4Qt5t2dBw1Ql6yV5tIUjpQCG5fAThNZMg9dfWjOgGhJ5AklyEVDBKZKN';
  const password = 'EGtCQ99qjFLUAaKNrPLHE9e7vD1bwyVuXVeNXcZtBLLM3X3LU-N8GlkMDCt179F-jv9UG3aosF_Ep71L';
  const encodedBase64Token = base64_encode(`${username}:${password}`);
  const authorization = `Basic ${encodedBase64Token}`;
  //var session_url = 'https://api-m.sandbox.paypal.com/v1/reporting/balances';
 // console.log('af',encodedBase64Token)
  const response = axios({
    url: 'https://api-m.sandbox.paypal.com/v1/reporting/balances',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authorization,
    },   
});
  return (
    
  
      <div className=""style={{backgroundColor: "#FFFF99"}}>
            
                {/* <div className="row align-items-center"> */}
                <div className="text-center">
                    {/* <div className="ads-content"> */}
                    <span className="h1" style={{fontFamily: "Brush Script MT", fontSize: "200px"}}>Thank You</span>
                    <h2 className="mt-3">Your purchase is truly appreciated!</h2>

                    <h2 className="mt-3">Please check your email for order code and your invoce</h2>
                    
                {/* </div> */}
                </div>
                <div className="text-center" style={{backgroundColor: "#A9A9A9", borderRadius: "100px", width: "450px", marginLeft:"auto",marginRight:"auto"}}>
                      <p className="text-md mt-3 text-white">Anything amiss?</p>
                      <p className="text-md mt-3 text-white">Email us to khoaluantotnghiep2223@gmail.com</p>
                      <p className="text-md mt-3 text-white">or call us at (+84) 94-529-1058</p>
                    </div>
                <div className="text-center cart-buttons mt-3"  style={{padding: "10px 0px 50px 0px"}}>
                    <Link to="/order" className="btn btn-primary btn-small fa-lg gradient-custom-2 mb-3 mr-5" style={{borderRadius: "100px"}}>Order History</Link>

                    <Link to="/shop" className="btn btn-primary btn-small fa-lg gradient-custom-2 mb-3 ml-5" style={{borderRadius: "100px"}}>Shop Continue</Link>
                </div>           
            {/* </div> */}
        </div>
   
  )
}

export default Thanks
