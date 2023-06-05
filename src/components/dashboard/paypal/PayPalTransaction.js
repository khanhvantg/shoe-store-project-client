import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import axios from './axios';
import { post } from "jquery";
import { getBalance, getListTransaction, refundTransaction } from "../../../redux/actions/PayPalAction";
import Loading from "../../loadingError/Loading";
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'
import { getAllOrders, updateOrder } from "../../../redux/actions/OrderAction";
import { PAYPAL_REFUND_RESET } from "../../../redux/constants/Constants";
import LoadingCustom from "../../loadingError/LoadingCustom";
import CofirmBox from "../../cofirmBox/CofirmBox";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PayPalTransaction = () => {
    const {isShowing:isShowConfirmBox, toggle:toggleConfirmBox, id: idTransaction, toggleImage: getIdOrder, idd: idOrder} = useModal();
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
    const dispatch = useDispatch();
    const dispatch1 = useDispatch();
    const dispatch2 = useDispatch();
    const dispatch3 = useDispatch();
    const paypalTransaction = useSelector((state) => state.paypalTransaction);
    const { loading, error, money} = paypalTransaction;
    
    const paypalBalance = useSelector((state) => state.paypalBalance);
    const { loading: loadingBalance, error: errorBlance, balance} = paypalBalance;

    const orderList= useSelector((state) => state.orderList);
    const { orders } = orderList;

    const paypalRefund = useSelector((state) => state.paypalRefund);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successRefund,
    } = paypalRefund;
    // console.log('c',balance)
    // GET with Axios
    const [transaction_id, setTransaction_id]=useState(0)
    useEffect(() => {
        if (successRefund){
            dispatch({type: PAYPAL_REFUND_RESET});
            dispatch1(getListTransaction(startDate,endDate));
            dispatch2(getBalance());
            dispatch3(getAllOrders());
        } else {
            dispatch1(getListTransaction(startDate,endDate));
            dispatch2(getBalance());
            dispatch3(getAllOrders());
        }   
   }, [dispatch,dispatch1,dispatch2,dispatch3, startDate, endDate, successRefund]);
    const arr = [];
    const arr1 = [];
    const moneyIn = money&&money.reduce(function (result, item) {
        const a = item.transaction_info;
        let mn = Number(a.transaction_amount.value);
        let mnf = 0;
        if(a.transaction_id!=='00C038196C7999707'){
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
        if(a.transaction_id!=='00C038196C7999707'){
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
    for(let j in money){
        money[j].transaction_info.status='0';
        money[j].transaction_info.order_id='0';
        for(let i in orders){
            if(money[j].transaction_info.transaction_id===orders[i].transactionCode){
                money[j].transaction_info.order_id=orders[i].id;
                if(orders[i].paymentStatus==='2'){
                    money[j].transaction_info.status='-1';
                    break;
                } else if (orders[i].paymentStatus==="1") {
                    money[j].transaction_info.status='1';
                    break;
                }
            }
            // if(money[j].transaction_info.transaction_id===orders[i].transactionCode&&orders[i].paymentStatus==='2'){
            //     money[j].transaction_info.status='-1';
            //     money[j].transaction_info.order_id=orders[i].id;
            //     break;
            // }
            // if(money[j].transaction_info.transaction_id===orders[i].transactionCode&&orders[i].paymentStatus==="1"){
            //     money[j].transaction_info.status='1';
            //     money[j].transaction_info.order_id=orders[i].id;
            //     break;
            // }
        }
    }
    var today = new Date();
    const handleRefund = () => {
        dispatch(refundTransaction(idTransaction))
        const orderInfo = {
            orderId: idOrder,
            status: '0',
            paymentStatus: '2',
            modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
        }
        dispatch1(updateOrder({orderInfo}))
    }
    //   const handleRefund = (transaction_id, order_id) => {
    //     dispatch(refundTransaction(transaction_id))
    //     const orderInfo = {
    //         orderId: order_id,
    //         status: '0',
    //         paymentStatus: '2',
    //         modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
    //     }
    //     dispatch1(updateOrder({orderInfo}))
    //   }
    const ListItem = () => {
        return (
            <tr>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
            </tr>
        ); 
    }
    console.log(money)
  return (
    <>
    {
            loadingUpdate&&<LoadingCustom content='Refunding'/>
        }
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
                 

                   <div class="row mb-40">

                       <div class="col-xl-6">
                           <div class="card">
                               <div class="card-heading p-4">
                                   <div class="mini-stat-icon float-right">
                                       <i class="mdi mdi-cube-outline bg-primary  text-white"></i>
                                   </div>
                                   <div>
                                       <h5 class="font-16">PayPal Balance</h5>
                                   </div>
                                   {loadingBalance ? (
                                <Loading />
                            ) : errorBlance ? (
                                <Message variant="alert-danger">{errorBlance}</Message>
                            ) : (
                                   <h3 class="mt-4">${balance.value}</h3>)}
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
                   
               </div>
           </div>
           <div className="row" style={{margin: "0px 15px"}}>
                       <div className="mb-1 mr-2">
                   <button className="button-2" onClick={handleClickStart}>
                        Start Date: {format(sDate, "yyyy-MM-dd")}
                        <i>  </i>
                        <i className="tf-ion-android-calendar"></i>
                    </button>
                    {isOpenStart && (
                        <div style={{position: "absolute"}}>
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
                              </div>
                        )}
                        </div>
                        <div className="">
                    <button className="button-2" onClick={handleClickEnd}>
                        End Date: {format(eDate, "yyyy-MM-dd")}
                        <i>  </i>
                        <i className="tf-ion-android-calendar"></i>
                    </button>
                    {isOpenEnd && (
                        <div style={{position: "absolute"}}>
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
                            </div>
                        )}
                        </div> 
                        </div>
                        {/* {isOpenStart && (
            <div style={{position: "absolute", margin: "0px 15px"}}>
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
            </div>
            )} */}
            <div>
            <div className="row" style={{margin: "10px 0px", position: "none"}}>
                       <div class="col-xl-6 mb-1" style={{position: "initial"}}>
                           <div class="" style={{backgroundColor: "white"}}>
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
                                <Message variant="alert-danger" style ={{position: "initial"}}>{error}</Message>
                            ) : (
                                   <h3 class="mt-4">${Math.round(moneyIn*100)/100}</h3>)}
                                   {/* <div class="progress mt-4" style={{height: "4px"}}>
                                       <div class="progress-bar bg-success" role="progressbar" style={{width: "88%"}} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                   </div>
                                   <p class="text-muted mt-2 mb-0">Previous period<span class="float-right">88%</span></p> */}
                               </div>
                           </div>
                       </div>

                       <div class="col-xl-6" style={{position: "initial"}}>
                           <div class="bg-white">
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
                                   <h3 class="mt-4">${Math.round(moneyOut*100)/100}</h3>)}
                                   {/* <div class="progress mt-4" style={{height: "4px"}}>
                                       <div class="progress-bar bg-warning" role="progressbar" style={{width: "68%"}} aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"></div>
                                   </div>
                                   <p class="text-muted mt-2 mb-0">Previous period<span class="float-right">68%</span></p> */}
                               </div>
                           </div>
                       </div>


                       </div>
                
           <div class="row">
                       <div class="col-xl-12" style={{position: "initial"}}>
                           <div class="bg-white m-b-30" style={{margin: "10px 15px"}}>
                               <div class="card-body">
                                   <h4 class="mt-0 header-title mb-4 text-center">Active Transaction</h4>
                                  
                                   <div className="e-table">
                            <div className="table-responsive table-lg mt-3">
                                <table className="table table-bordered table-hover">
                                    <thead align="center">
                                        <tr>
                                            {/* <th>Id</th> */}
                                            <th>Transaction Code</th>
                                            <th>Order Id</th>
                                            <th>Transaction Amount</th>
                                            <th>Fee Amount</th>
                                            <th>Available Balance</th>
                                            <th>Ending Balance</th>
                                            <th>Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ? (
                                        <tbody  align="center">
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                        </tbody>
                                    ) : (
                                    <tbody  align="center">
                                    { money && money.sort((a,b)=>(b.transaction_info.status-a.transaction_info.status)).map((item,index) => (
                                        <>
                                        {item.transaction_info.order_id!=='0'&&
                                        <tr style={{backgroundColor: item.transaction_info.status==='-1'&&"gray", textDecorationLine: item.transaction_info.status==='-1'&&"line-through"}}>
                                            {/* <td className="align-middle">{account.id}</td> */}
                                            <td className="text-nowrap align-middle text-center">{item.transaction_info.transaction_id}</td>
                                            <td className="text-nowrap align-middle text-center">{item.transaction_info.order_id}</td>
                                            <td className="text-nowrap align-middle text-center">${item.transaction_info.transaction_amount.value}</td>
                                            <td className="text-nowrap align-middle text-center">${item.transaction_info.transaction_id==='00C038196C7999707'?0:item.transaction_info.fee_amount.value}</td>
                                            <td className="text-nowrap align-middle text-center">${item.transaction_info.available_balance.value}</td>
                                            <td className="text-nowrap align-middle text-center">${item.transaction_info.ending_balance.value}</td>
                                            <td className="text-nowrap align-middle text-center">{item.transaction_info.transaction_id==='00C038196C7999707'||item.transaction_info.protection_eligibility==='01'?'Payment':'Refunded'}</td>
                                            
                                                <td className="text-center align-middle">
                                                <div className="btn-group align-top">
                                                    {item.transaction_info.status==='1'&&
                                                    <button className="btn btn-sm btn-outline-secondary badge" type="button" 
                                                        // onClick={()=>handleRefund(item.transaction_info.transaction_id,item.transaction_info.order_id)}
                                                        onClick={()=>{toggleConfirmBox(item.transaction_info.transaction_id); getIdOrder(item.transaction_info.order_id)}}
                                                    > 
                                                        Refund
                                                    </button>
                                                    ||<span>None</span>
                                                    }
                                                </div>
                                            </td>
                                            
                                        </tr>}
                                        </>
                                    ))}
                                    </tbody>)}
                                </table>
                                {error && <Message variant="alert-danger">{error}</Message>}
                            </div>
                      
                    
                                   </div>

                               </div>
                           </div>
                       </div>

                   </div>
            </div>     

       </div>
    </div>
    <CofirmBox 
            isShowing={isShowConfirmBox}
            noHandle={toggleConfirmBox}
            yesHanle={handleRefund}
        />
</div>
</>
  )
}

export default PayPalTransaction;