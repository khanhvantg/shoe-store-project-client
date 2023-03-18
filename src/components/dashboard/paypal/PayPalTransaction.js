import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import axios from './axios';
import { post } from "jquery";
import { getBalance, getListTransaction } from "../../../redux/actions/PayPalAction";
import Loading from "../../loadingError/Loading";
import Message from "../../loadingError/Message";
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'
const PayPalTransaction = () => {

    // const username = 'AXap4VJ7Ie8T2UPEEQYQLoYR4Qt5t2dBw1Ql6yV5tIUjpQCG5fAThNZMg9dfWjOgGhJ5AklyEVDBKZKN';
    // const password = 'EGtCQ99qjFLUAaKNrPLHE9e7vD1bwyVuXVeNXcZtBLLM3X3LU-N8GlkMDCt179F-jv9UG3aosF_Ep71L';
    // const encodedBase64Token = base64_encode(`${username}:${password}`);
    // const authorization = `Basic ${encodedBase64Token}`;
    // const authHeader = () => {
    //     return {  
    //         'Content-Type': 'application/json',
    //         //'Authorization': 'Bearer A21AAJ3-lFCgtoqsPB-XcMSswE3oQaBRLf2Qx26gEJ0znAjFTKQ9waTntIJwgIkSFF0Hrvyir6xlj6HEvnQRQs-KImcqNOw8w'
    //         'Authorization': authorization,
    //     };
    //   }
    // const data = axios({
    //     url: 'https://api-m.sandbox.paypal.com/v1/reporting/balances',
    //     method: 'GET',
    //     headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // 'Authorization': authorization,
    //     },
    //     data: {}
    // });
    // const data = axios.get('/v1/reporting/balances', {headers: {'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': authorization}})
    //     console.log('b',data.catch().data)


    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    // const [balance, setBalance] = useState([]);
    // const [money, setMoney] = useState([]);
    const dateold =new Date();
    const day = dateold.setDate(dateold.getDate() - 7)
    const [sDate, setSDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)))
    const [startDate, setStartDate] = useState(format(sDate, "yyyy-MM-dd'T'00:00:00-0700"))
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd'T'23:59:00-0700"))
    const [eDate, setEDate] = useState(new Date())
    const dispatch1 = useDispatch();
    const dispatch2 = useDispatch();
    const paypalTransaction = useSelector((state) => state.paypalTransaction);
    const { loading, error, money} = paypalTransaction;
    
    const paypalBalance = useSelector((state) => state.paypalBalance);
    const { loading: loadingBalance, error: errorBlance, balance} = paypalBalance;
    console.log('c',balance)
    // GET with Axios
    useEffect(() => {
        dispatch1(getListTransaction(startDate,endDate));
        dispatch2(getBalance());
        
   }, [dispatch1,dispatch2, startDate, endDate]);
    const arr = [];
    const arr1 = [];
    const moneyIn = money&&money.reduce(function (result, item) {
        const a = item.transaction_info;
        let mn = Number(a.transaction_amount.value);
        let mnf = 0;
        if(a.transaction_id!=='8H322824545486633'){
            mnf = Number(a.fee_amount.value)
        }
        if(mn>0){
            arr.push(mn);
            arr1.push(mnf);
            return result + mn;
        }
        else {return result};
      }, 0);
      const moneyOut = money&&money.reduce(function (result, item) {
        const a = item.transaction_info;
        let mn = Number(a.transaction_amount.value);
        let mnf = 0;
        if(a.transaction_id!=='8H322824545486633'){
            // console.log(a)
            mnf = Number(a.fee_amount.value);
        }
        if(mn<0){
            arr.push(mn);
            arr1.push(mnf);
            return result + mn;
        }
        else {arr1.push(mnf); return result};
      }, 0);
    const [isOpenStart, setIsOpenStart] = useState(false);
    const [isOpenEnd, setIsOpenEnd] = useState(false);
    const handleClickStart = (e) => {
      e.preventDefault();
      setIsOpenStart(!isOpenStart);
    };
    const handleClickEnd = (e) => {
        e.preventDefault();
        setIsOpenEnd(!isOpenEnd);
      };
  return (
    <div className="e-panel cardcus" style={{width:"100%"}}>
    <div className="card-body">
        {/* <div className="text-center card-title">
            <h3 className="mr-2">Accounts Manage</h3>
        </div> */}
       <div class="content-page">
           
           <div class="content">
               <div class="container-fluid">
                   <div class="page-title-box">
                        <div class="text-center">
                               <h4 class="page-title">PayPal Transaction</h4>
                           </div>
                       {/* <div class="row align-items-center">
                           <div class="col-sm-6 text-center">
                               <h4 class="page-title">PayPal Transaction</h4>
                           </div>
                           <div class="col-sm-6">
                               <ol class="breadcrumb float-right">
                                   <li class="breadcrumb-item"><a href="#">Jassa</a></li>
                                   <li class="breadcrumb-item active">Dashboard</li>
                               </ol>
                           </div>
                       </div> */}
                     
                   </div>
                 

                   <div class="row">

                       <div class="col-xl-6">
                           <div class="card">
                               <div class="card-heading p-4">
                                   <div class="mini-stat-icon float-right">
                                       <i class="mdi mdi-cube-outline bg-primary  text-white"></i>
                                   </div>
                                   <div>
                                       <h5 class="font-16">PayPal Balance</h5>
                                   </div>
                                   <h3 class="mt-4">${balance.value}</h3>
                                   {/* <div class="progress mt-4" style={{height: "4px"}}>
                                       <div class="progress-bar bg-primary" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                   </div>
                                   <p class="text-muted mt-2 mb-0">Previous period<span class="float-right">75%</span></p> */}
                               </div>
                           </div>
                       </div>
                       
                       
                       {/* <div class="col-sm-6 col-xl-3">
                           <div class="card">
                               <div class="card-heading p-4">
                                   <div class="mini-stat-icon float-right">
                                       <i class="mdi mdi-buffer bg-danger text-white"></i>
                                   </div>
                                   <div>
                                       <h5 class="font-16">Add to Card</h5>
                                   </div>
                                   <h3 class="mt-4">86%</h3>
                                   <div class="progress mt-4" style={{height: "4px"}}>
                                       <div class="progress-bar bg-danger" role="progressbar" style={{width: "82%"}} aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div>
                                   </div>
                                   <p class="text-muted mt-2 mb-0">Previous period<span class="float-right">82%</span></p>
                               </div>
                           </div>
                       </div> */}

                   </div>
                   <div className="row">
                       
                       <div className="col-xl-3 ">
                   <button className="btn btn-info" onClick={handleClickStart}>
                        Start Date: {format(sDate, "yyyy-MM-dd")}
                        <i>  </i>
                        <i className="tf-ion-android-calendar"></i>
                    </button>
                    {isOpenStart && (
                                <DatePicker
                                selected={sDate}
                                onChange={(date) => {
                                  setSDate(date);
                                  setStartDate(format(date,"yyyy-MM-dd'T'00:00:00-0700"));
                                  setIsOpenStart(!isOpenStart);
                                }
                              }
                                dateFormat="yyyy-MM-dd"
                                inline
                              />
                        )}
                        </div>
                        <div className="col-xl-3 ">
                    <button className="btn btn-info" onClick={handleClickEnd}>
                        End Date: {format(eDate, "yyyy-MM-dd")}
                        <i>  </i>
                        <i className="tf-ion-android-calendar"></i>
                    </button>
                    {isOpenEnd && (
                                <DatePicker
                                selected={eDate}
                                onChange={(date) => {
                                  setEDate(date);
                                  setEndDate(format(date,"yyyy-MM-dd'T'23:59:59-0700"));
                                  setIsOpenEnd(!isOpenEnd);
                                }
                              }
                              dateFormat="yyyy-MM-dd"
                                inline
                              />
                        )}
                        </div> 
                        </div> 
                   <div className="row">
                       <div class="col-xl-6">
                           <div class="card">
                               <div class="card-heading p-4">
                                   <div class="mini-stat-icon float-right">
                                       <i class="mdi mdi-briefcase-check bg-success text-white"></i>
                                   </div>
                                   <div>
                                       <h5 class="font-16">Money In</h5>
                                   </div>
                                   {loading ? (
                                <Loading />
                            ) : error ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                                   <h3 class="mt-4">${moneyIn}</h3>)}
                                   {/* <div class="progress mt-4" style={{height: "4px"}}>
                                       <div class="progress-bar bg-success" role="progressbar" style={{width: "88%"}} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                   </div>
                                   <p class="text-muted mt-2 mb-0">Previous period<span class="float-right">88%</span></p> */}
                               </div>
                           </div>
                       </div>

                       <div class="col-xl-6">
                           <div class="card">
                               <div class="card-heading p-4">
                                   <div class="mini-stat-icon float-right">
                                       <i class="mdi mdi-tag-text-outline bg-warning text-white"></i>
                                   </div>
                                   <div>
                                       <h5 class="font-16">Money Out</h5>
                                   </div>
                                   {loading ? (
                                <Loading />
                            ) : error ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                                   <h3 class="mt-4">${moneyOut}</h3>)}
                                   {/* <div class="progress mt-4" style={{height: "4px"}}>
                                       <div class="progress-bar bg-warning" role="progressbar" style={{width: "68%"}} aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"></div>
                                   </div>
                                   <p class="text-muted mt-2 mb-0">Previous period<span class="float-right">68%</span></p> */}
                               </div>
                           </div>
                       </div>


                       </div>
                      
                   {/* <div class="row">
                       <div class="col-xl-8">
                           <div class="card m-b-30">
                               <div class="card-body">

                                   <h4 class="mt-0 header-title mb-4">Area Chart</h4>

                                   <div id="morris-area-example" class="morris-charts morris-chart-height"></div>

                               </div>
                           </div>
                       </div>
                     

                       <div class="col-xl-4">
                           <div class="card m-b-30">
                               <div class="card-body">
                                   <h4 class="mt-0 header-title mb-4">Donut Chart</h4>

                                   <div id="morris-donut-example" class="morris-charts morris-chart-height"></div>

                               </div>
                           </div>
                       </div>
                       
                   </div> */}
                  

                   {/* <div class="row">
                       <div class="col-xl-4">
                           <div class="card m-b-30">
                               <div class="card-body">
                                   <h4 class="mt-0 header-title mb-4">Friends Suggestions</h4>
                                   <div class="friends-suggestions">
                                       <a href="#" class="friends-suggestions-list">
                                           <div class="border-bottom position-relative">
                                               <div class="float-left mb-0 mr-3">
                                                   <img src="assets/images/user-2.jpg" alt="" class="rounded-circle thumb-md" />
                                               </div>
                                               <div class="suggestion-icon float-right mt-2 pt-1">
                                                   <i class="mdi mdi-plus"></i>
                                               </div>

                                               <div class="desc">
                                                   <h5 class="font-14 mb-1 pt-2">Ralph Ramirez</h5>
                                                   <p class="text-muted">3 Friend suggest</p>
                                               </div>
                                           </div>
                                       </a>

                                       <a href="#" class="friends-suggestions-list">
                                           <div class="border-bottom position-relative">
                                               <div class="float-left mb-0 mr-3">
                                                   <img src="assets/images/user-3.jpg" alt="" class="rounded-circle thumb-md" />
                                               </div>
                                               <div class="suggestion-icon float-right mt-2 pt-1">
                                                   <i class="mdi mdi-plus"></i>
                                               </div>

                                               <div class="desc">
                                                   <h5 class="font-14 mb-1 pt-2">Patrick Beeler</h5>
                                                   <p class="text-muted">17 Friend suggest</p>
                                               </div>
                                           </div>
                                       </a>

                                       <a href="#" class="friends-suggestions-list">
                                           <div class="border-bottom position-relative">
                                               <div class="float-left mb-0 mr-3">
                                                   <img src="assets/images/user-4.jpg" alt="" class="rounded-circle thumb-md" />
                                               </div>
                                               <div class="suggestion-icon float-right mt-2 pt-1">
                                                   <i class="mdi mdi-plus"></i>
                                               </div>

                                               <div class="desc">
                                                   <h5 class="font-14 mb-1 pt-2">Victor Zamora</h5>
                                                   <p class="text-muted">12 Friend suggest</p>
                                               </div>
                                           </div>
                                       </a>

                                       <a href="#" class="friends-suggestions-list">
                                           <div class="border-bottom position-relative">
                                               <div class="float-left mb-0 mr-3">
                                                   <img src="assets/images/user-5.jpg" alt="" class="rounded-circle thumb-md" />
                                               </div>
                                               <div class="suggestion-icon float-right mt-2 pt-1">
                                                   <i class="mdi mdi-plus"></i>
                                               </div>

                                               <div class="desc">
                                                   <h5 class="font-14 mb-1 pt-2">Bryan Lacy</h5>
                                                   <p class="text-muted">18 Friend suggest</p>
                                               </div>
                                           </div>
                                       </a>

                                       <a href="#" class="friends-suggestions-list">
                                           <div class="position-relative">
                                               <div class="float-left mb-0 mr-3">
                                                   <img src="assets/images/user-6.jpg" alt="" class="rounded-circle thumb-md" />
                                               </div>
                                               <div class="suggestion-icon float-right mt-2 pt-1">
                                                   <i class="mdi mdi-plus"></i>
                                               </div>

                                               <div class="desc">
                                                   <h5 class="font-14 mb-1 pt-2">James Sorrells</h5>
                                                   <p class="text-muted mb-1">6 Friend suggest</p>
                                               </div>
                                           </div>
                                       </a>

                                   </div>
                               </div>
                           </div>
                       </div>

                       <div class="col-xl-4">
                           <div class="card m-b-30">
                               <div class="card-body">
                                   <h4 class="mt-0 header-title mb-4">Sales Analytics</h4>
                                   <div id="morris-line-example" class="morris-chart" style={{height: "360px"}}></div>

                               </div>
                           </div>

                       </div>

                       <div class="col-xl-4">
                           <div class="card m-b-30">
                               <div class="card-body">

                                   <h4 class="mt-0 header-title mb-4">Recent Activity</h4>
                                   <ol class="activity-feed mb-0">
                                       <li class="feed-item">
                                           <div class="feed-item-list">
                                               <p class="text-muted mb-1">Now</p>
                                               <p class="font-15 mt-0 mb-0">Jassa magna Jassa, risus posted a new article: <b class="text-primary">Forget UX Rowland</b></p>
                                           </div>
                                       </li>
                                       <li class="feed-item">
                                           <p class="text-muted mb-1">Yesterday</p>
                                           <p class="font-15 mt-0 mb-0">Jassa posted a new article: <b class="text-primary">Designer Alex</b></p>
                                       </li>
                                       <li class="feed-item">
                                           <p class="text-muted mb-1">2:30PM</p>
                                           <p class="font-15 mt-0 mb-0">Jassa, Jassa, Jassa Commented <b class="text-primary"> Developer Moreno</b></p>
                                       </li>
                                       <li class="feed-item pb-1">
                                           <p class="text-muted mb-1">12:48 PM</p>
                                           <p class="font-15 mt-0 mb-2">Jassa, Jassa Commented <b class="text-primary">UX Murphy</b></p>
                                       </li>

                                   </ol>

                               </div>
                           </div>
                       </div>
                   </div>

                  */}
                   
               </div>
              

           </div>

           <div class="row">
                       <div class="col-xl-12">
                           <div class="card m-b-30">
                               <div class="card-body">
                                   <h4 class="mt-0 header-title mb-4 text-center">Active Transaction</h4>
                                  
                                   <div className="e-table">
                            <div className="table-responsive table-lg mt-3">
                            {loading ? (
                                <Loading />
                            ) : error ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                                <table className="table table-bordered table-hover">
                                    <thead align="center">
                                        <tr>
                                            {/* <th>Id</th> */}
                                            <th>Transaction Amount</th>
                                            <th>Fee Amount</th>
                                            <th>Available Balance</th>
                                            <th>Ending Balance</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody  align="center">
                                    { money && money.map((item,index) => (
                                        <tr>
                                            {/* <td className="align-middle">{account.id}</td> */}
                                            <td className="text-nowrap align-middle text-center">${item.transaction_info.transaction_amount.value}</td>
                                            <td className="text-nowrap align-middle text-center">${item.transaction_info.transaction_id==='8H322824545486633'?0:item.transaction_info.fee_amount.value}</td>
                                            <td className="text-nowrap align-middle text-center">${item.transaction_info.available_balance.value}</td>
                                            <td className="text-nowrap align-middle text-center">${item.transaction_info.ending_balance.value}</td>
                                            <td className="text-nowrap align-middle text-center">{item.transaction_info.transaction_id==='8H322824545486633'||item.transaction_info.protection_eligibility==='01'?'Payment':'Refund'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>)}
                            </div>
                      
                    
                                   </div>

                               </div>
                           </div>
                       </div>

                   </div>
                 

       </div>
    </div>
</div>

  )
}

export default PayPalTransaction;