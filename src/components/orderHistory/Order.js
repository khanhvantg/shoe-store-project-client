import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from '../../redux/actions/CartAction'
import { getWishListById,removeLineItem } from '../../redux/actions/WishlistAction'
import { createOrder, getOrdersByUserId, updateOrder } from '../../redux/actions/OrderAction'
import OrderDetail from "./OrderDetail";
import useModal from '../dashboard/useModal';
import {
    ORDER_UPDATE_RESET,
} from '../../redux/constants/Constants'
import CofirmBox from "../cofirmBox/CofirmBox";
import '../cofirmBox/CofirmBox.css'
import Loading from "../loadingError/Loading";
import LoadingCustom from "../loadingError/LoadingCustom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import Message from "../loadingError/Message";
const Order = () => {
    const {isShowing, toggle, id} = useModal();
    const {isShowing:isShowConfirmBox, toggle:toggleConfirmBox, id: idOrder} = useModal();
    const dispatch = useDispatch();
    const [status, setStatus]=useState(0);
    const [paymentStatus, setPaymentStatus]=useState(1);
    const orderListByUserId = useSelector((state) => state.orderListByUserId);
    const { loading, error, orders} = orderListByUserId;

    const orderUpdate = useSelector((state) => state.orderUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = orderUpdate;

    useEffect(()=>{
        if (successUpdate){
            dispatch({type: ORDER_UPDATE_RESET});
        }
        dispatch(getOrdersByUserId());
    },[dispatch, successUpdate])
    
    const handleCancel = () => {
        const orderInfo = {
            orderId: idOrder,
            status,
            paymentStatus,
        }
        dispatch(updateOrder({orderInfo}));
    }
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
  return (
    <>
    {
        loadingUpdate&&<LoadingCustom content='Canceling'/>
    }
    <div className="checkout-container">
        <section className="cart shopping page-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <h1>Order History</h1>
                    <div className="col-lg-12">
                        <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                            <table className="table table-bordered table-hover">
                                <thead align="center">
                                    <tr>
                                        <th>OrderID</th>
                                        <th>Date</th>
                                        <th>Delivery Date</th>
                                        <th>Total Price</th>
                                        <th>Payment Type</th>
                                        <th>Payment Status</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <tbody align="center">
                                        <ListItem/>
                                        <ListItem/>
                                        <ListItem/>
                                        <ListItem/>
                                        <ListItem/>
                                        <ListItem/>
                                    </tbody>    
                                ) : error ? (
                                    <tfoot align="center">
                                            <tr>
                                            <th colspan="8">
                                            <Message variant="alert-danger">{error}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>
                                ):
                                <tbody align="center">
                                {orders&&orders.sort((a,b)=>(b.id-a.id)).map((item)  => (
                                    <tr onClick={()=>toggle(item.id)}>
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

                                        <td className="text-nowrap align-middle">${item.orderPrice!=null?Math.round(item.orderPrice*100)/100:Math.round(item.totalPrice*100)/100}</td>

                                        {/* <td className="text-nowrap align-middle">{item.amountItem}</td> */}
                                        {item.paymentType === null || item.paymentType === "0" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>COD</span>
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
                                        
                                        {item.status ==="0" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#d92600",borderRadius:"5px", color: "white" , padding: "4px"}}>Cancelled</span>
                                            </td>
                                        ):item.status ==="1" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"gold",borderRadius:"5px", color: "white" , padding: "4px"}}>Waiting</span>
                                            </td>
                                        ):item.status ==="2" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"blue",borderRadius:"5px", color: "white" , padding: "4px"}}>Shipping</span>
                                            </td>
                                        ):(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>Completed</span>
                                            </td>
                                        )}

                                        <td className="text-center align-middle">
                                        <div className="btn-group align-top">
                                            <button 
                                                onClick={(e)=>{e.stopPropagation(); toggle(item.id)}}
                                                className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                                <i className="tf-ion-ios-eye"></i>
                                            </button>
                                            {item.status ==="1"&&
                                                <button
                                                    onClick={(e)=>{e.stopPropagation();toggleConfirmBox(item.id)}}
                                                    //onClick={()=>handleCancel(item.id)}
                                                    className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                                    <i className="tf-ion-android-delete"></i>
                                                </button>
                                            }
                                        </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            }
                            </table>

                        </div>
                    </div>
                    {(loading!==true&&orders&&orders.length<=0)&&
                        <div className="text-center">
                            <h1>There are no orders yet</h1>
                            
                            <Link reloadDocument={true}  to="/shop?page=1" className="button-1">
                                Shop Now
                            </Link>
                        </div>
                    }
                </div>
            </div>
                <OrderDetail 
                isShowing={isShowing}
                hide={toggle}
                // lineItems={lineItems}
                id={id}
                // linItems={order}
                />
            </div>
        </section>
            <CofirmBox 
                isShowing={isShowConfirmBox}
                noHandle={toggleConfirmBox}
                yesHanle={handleCancel}
               // id={idOrder}
            />       
    </div>
    </>
  )
}

export default Order
