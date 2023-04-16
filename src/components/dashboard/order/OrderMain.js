import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts} from '../../../redux/actions/ProductAction'
// import { getAllcategories, getCategoryById, stopGetCategory } from '../../../redux/actions/CategoryAction'
// import { CATEGORY_DETAILS_STOP, CATEGORY_DETAILS_SUCCESS } from '../../../redux/constants/Constants'
import Status from '../../status/Status';
import {
    ORDER_UPDATE_RESET,
} from '../../../redux/constants/Constants'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import { getAllOrders, updateOrder } from '../../../redux/actions/OrderAction'
import OrderDetail from "./OrderDetail";
const OrderMain = () => {
    const {isShowing, toggle, id} = useModal();
    const dispatch = useDispatch();
    const dispatchUpdate = useDispatch();
    const orderList= useSelector((state) => state.orderList);
    const { loading, error, orders} = orderList;

    const [status, setStatus]=useState();
    const [orderId, setOderId]=useState();
    const orderUpdate = useSelector((state) => state.orderUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = orderUpdate;

    var today = new Date();
    const [orderInfo, setOrderInfo] = useState({
        orderId: null,
        status: null,
        paymentStatus: null,
        modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
    })
    useEffect(()=>{
        if (successUpdate) {
            dispatch({type: ORDER_UPDATE_RESET});
            dispatch(getAllOrders());
        }else{
            dispatch(getAllOrders());
            // if(orderId!=null){
            //     dispatchUpdate(updateOrder({orderInfo}));
            //     setStatus()
            //     setOderId();
            // }
        }
    }, [successUpdate, dispatch]);
    // if(!error){
    //     orders.sort((a,b)=>(a.id-b.id));
    // }
    // const orderDetail = useSelector((state) => state.orderDetail);
    // const { order } = orderDetail;
    // var today = new Date();
    // const orderInfo = {
    //     orderId,
    //     status,
    //     modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
    // }


    var today = new Date();
    const handleC = (e,idO) => {
        const orderInfo = {
            orderId: idO,
            status: e.target.value,
            paymentStatus: e.target.value==='0'?'1':'0',
            modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
        }
        dispatch(updateOrder({orderInfo}));
        //console.log(orderInfo)
        // setStatus(e.target.value);
        // setOderId(idO);
    }
  return (
    // <div className="row flex-lg-nowrap">
    //     <div className="col mb-3">
            <div className="e-panel cardcus" style={{width:"100%"}}>
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Orders Manage</h3>
                    </div>
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
                                        <th>OrderID</th>
                                        <th>Order Date</th>
                                        {/* <th>Amount Item</th> */}
                                        <th>Delivery Date</th>
                                        <th>Total Price</th>
                                        <th>Payment Type</th>
                                        <th>Payment Status</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody align="center">
                                {orders&&orders.sort((a,b)=>(b.id-a.id)).map((item, index)  => (
                                    <tr onClick={()=>{toggle(item.id)}}>
                                        <td className="text-nowrap align-middle">{item.id}</td>
                                        <td className="text-nowrap align-middle">{item.createdDate}</td>
                                        {item.status ==='3' ?
                                            <td className="text-nowrap align-middle">
                                                {item.modifiedDate}
                                            </td>
                                            :
                                            <td className="text-nowrap align-middle">
                                            </td>
                                        }
                                        <td className="text-nowrap align-middle">${item.orderPrice!=null?item.orderPrice:item.totalPrice}</td>
                                        {/* <td className="text-nowrap align-middle">{item.amountItem}</td> */}
                                        {item.paymentType === null || item.paymentType === "0" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00", borderRadius:"5px", color: "white" , padding: "4px"}}>COD</span>
                                            </td>
                                        ):item.paymentType ==="1" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>PayPal</span>
                                            </td>
                                        ):(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>COD</span>
                                            </td>
                                        )}
                                    
                                        {(item.paymentStatus==="0"||item.paymentStatus===null)&&item.paymentType==="1"&&item.status!=="0" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>Paid</span>
                                            </td>
                                        ):(item.paymentStatus==="1"||item.paymentStatus===null)&&item.paymentType==="1"&&item.status==="0" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"gold",borderRadius:"5px", color: "white" , padding: "4px"}}>Refunding</span>
                                            </td>
                                        ):item.paymentStatus==="2"&&item.paymentType==="1" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"blue",borderRadius:"5px", color: "white" , padding: "4px"}}>Refunded</span>
                                            </td>
                                        ):item.status!=="0"&&item.status!=="3" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"gold",borderRadius:"5px", color: "white" , padding: "4px"}}>Paying</span>
                                            </td>
                                        ):item.status ==="3" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>Paid</span>
                                            </td>
                                        ):(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"", color: "" , padding: "4px"}}>None</span>
                                            </td>
                                        )}
                                        {/* {item.status ==="0" ? (
                                            <td className="text-nowrap align-middle" style={{color:"red"}}>Cancelled</td>
                                        ):item.status ==="1" ?(
                                            <td className="align-middle"  style={{color:"gold"}}>Waiting Confirm</td>
                                        ):item.status ==="2" ?(
                                            <td className="align-middle" style={{color:"blue"}}>Shipping</td>
                                        ):(
                                            <td className="align-middle" style={{color:"green"}}>Completed</td>
                                        )} */}
                                        {item.status ==="0" ? (
                                            <td onClick="disable">
                                                <form className="ordering" style={{width: "155px"}}>
                                                    <select className="orderby form-control" style={{color:"red"}} onChange={(e)=>handleC(e,item.id)} disabled>
                                                        <option className="text-nowrap align-middle" value="0">Cancelled</option>
                                                        <option value="1" style={{color:"gold"}}>Waiting Confirm</option>
                                                        <option value="2" style={{color:"blue"}}>Shipping</option>
                                                        <option value="3" style={{color:"green"}}>Completed</option>
                                                    </select>
                                                    <input type="hidden" name="paged" value="1" />
                                                </form>
                                            </td>
                                        ):item.status ==="1" ?(
                                            <td onClick="disable">
                                                <form className="ordering" style={{width: "155px"}}>
                                                    <select className="orderby form-control" style={{color:"gold"}} onChange={(e)=>handleC(e,item.id)}>
                                                        <option className="text-nowrap align-middle" value="1">Waiting Confirm</option>
                                                        <option value="0" style={{color:"red"}}>Cancel</option>
                                                        <option value="2" style={{color:"blue"}}>Shipping</option>
                                                        <option value="3" style={{color:"green"}}>Completed</option>
                                                    </select>
                                                    <input type="hidden" name="paged" value="1" />
                                                </form>
                                            </td>
                                        ):item.status ==="2" ?(
                                            <td onClick="disable">
                                                <form className="ordering" style={{width: "155px"}}>
                                                    <select className="orderby form-control" style={{color:"blue"}} onChange={(e)=>handleC(e,item.id)}>
                                                        <option className="text-nowrap align-middle" value="2">Shipping</option>
                                                        <option value="1" style={{color:"gold"}}>Waiting Confirm</option>
                                                        <option value="3" style={{color:"green"}}>Completed</option>
                                                        <option value="0" style={{color:"red"}}>Cancel</option>
                                                    </select>
                                                    <input type="hidden" name="paged" value="1" />
                                                </form>
                                            </td>
                                        ):(
                                            <td onClick="disable">
                                                <form className="ordering" style={{width: "155px"}}>
                                                    <select className="orderby form-control" style={{color:"green"}} onChange={(e)=>handleC(e,item.id)} disabled>
                                                        <option className="text-nowrap align-middle" value="3">Completed</option>
                                                        <option value="1" style={{color:"gold"}}>Waiting Confirm</option>
                                                        <option value="2" style={{color:"blue"}}>Shipping</option>
                                                        <option value="0" style={{color:"red"}}>Cancel</option>
                                                    </select>
                                                    <input type="hidden" name="paged" value="1" />
                                                </form>
                                            </td>
                                        )}

                                        <td className="text-center align-middle">
                                            <div className="btn-group align-top">
                                                {/* <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={""}> 
                                                    <i className="tf-ion-edit"></i>
                                                </button> */}
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(item.id)}}> 
                                                    <i className="tf-ion-eye"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            )}
                        </div>
                    </div>
                </div>
            {/* </div>
        </div> */}
        <OrderDetail
            isShowing={isShowing}
            hide={toggle}
            id={id}
            />
    </div>
    
  )
}

export default OrderMain
