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
const Order = () => {
    const {isShowing, toggle, id} = useModal();
    const {isShowing:isShowConfirmBox, toggle:toggleConfirmBox, id: idOrder} = useModal();
    const dispatch = useDispatch();
    const [status, setStatus]=useState(0);
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
            status
        }
        dispatch(updateOrder({orderInfo}));
    }
  return (
    <div className="checkout-container">
        <section className="cart shopping page-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <h3>Order History</h3>
                    <div className="col-lg-12">
                    {
                        loading ? (<Loading/>):(
                            <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                        {loading ? (
                            <Loading />
                        ) :
                            <table className="table table-bordered table-hover">
                                <thead align="center">
                                    <tr>
                                        <th>Order Code</th>
                                        <th>Date</th>
                                        <th>Delivery Date</th>
                                        <th>Total Price</th>
                                        <th>Payment Type</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody align="center">
                                {orders&&orders.sort((a,b)=>(b.id-a.id)).map((item)  => (
                                    <tr>
                                        <td className="text-nowrap align-middle">{item.number}</td>
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
                                        {item.paymentType === null || item.paymentType === 0 ? (
                                            <td className="text-nowrap align-middle" >
                                                <span style={{backgroundColor:"green", color: "white", borderRadius: "6px", padding: "4px"}}>At Store</span>
                                            </td>
                                        ):item.paymentType ==="1" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span style={{backgroundColor:"green", color: "white", borderRadius: "6px", padding: "4px"}}>PayPal</span>
                                            </td>
                                        ):(
                                            <td className="text-nowrap align-middle" >
                                                <span style={{backgroundColor:"green", color: "white", borderRadius: "6px", padding: "4px"}}>COD</span>
                                            </td>
                                        )}
                                    
                                        
                                        {item.status ==="0" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span style={{backgroundColor:"red", color: "white", borderRadius: "6px", padding: "4px"}}>Cancelled</span>
                                            </td>
                                        ):item.status ==="1" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span style={{backgroundColor:"gold", color: "white", borderRadius: "6px", padding: "4px"}}>Waiting</span>
                                            </td>
                                        ):item.status ==="2" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span style={{backgroundColor:"blue", color: "white", borderRadius: "6px", padding: "4px"}}>Shipping</span>
                                            </td>
                                        ):(
                                            <td className="text-nowrap align-middle" >
                                                <span style={{backgroundColor:"green", color: "white", borderRadius: "6px", padding: "4px"}}>Completed</span>
                                            </td>
                                        )}

                                        <td className="text-center align-middle">
                                        <div className="btn-group align-top">
                                            <button 
                                                onClick={()=>toggle(item.id)}
                                                className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                                <i className="tf-ion-ios-eye"></i>
                                            </button>
                                            {item.status ==="1"&&
                                                <button
                                                    onClick={()=>toggleConfirmBox(item.id)}
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
                            </table>
}
                        </div>
                    </div>
                    
                    )
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
  )
}

export default Order
