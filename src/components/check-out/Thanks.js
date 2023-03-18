import React from 'react'
import axios from '../../redux/actions/axios'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

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
    <div>
      Thanks
      <button >Call API</button>
      
    </div>
  )
}

export default Thanks
