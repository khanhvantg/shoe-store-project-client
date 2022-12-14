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
                    <div className="product-list">
                        <form className="cart-form">
                            <table className="table cart" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th className="product-thumbnail">OrderId</th>
                                        <th className="product-name">Date</th>
                                        {/* <th className="product-quantity">Amount Item</th> */}
                                        <th className="product-subtotal">Total</th>
                                        <th className="product-price">State</th>
                                        <th className="product-remove">Action</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {orders&&orders.sort((a,b)=>(a.id-b.id)).map(item=>(
                                        <tr className="cart_item">
                                    <td className="product-thumbnail" data-title="Thumbnail">
                                        {item.id}
                                    </td>
                                    <td className="product-name" data-title="Product">
                                        {item.createdDate}
                                    </td>
                                    {/* <td className="product-price" data-title="Price">
                                        {item.amountItem}
                                    </td> */}
                                    <td className="product-quantity" data-title="Quantity">
                                       ${item.totalPrice}
                                    </td>
                                    {/* <td className="product-subtotal" data-title="Total">
                                            {item.status}
                                    </td> */}
                                    {item.status ==="0" ? (
                                            <td className="text-nowrap align-middle" style={{color:"red"}}>Cancelled</td>
                                        ):item.status ==="1" ?(
                                            <td className="align-middle"  style={{color:"gold"}}>Waiting Confirm</td>
                                        ):item.status ==="2" ?(
                                            <td className="align-middle" style={{color:"blue"}}>Shipping</td>
                                        ):(
                                            <td className="align-middle" style={{color:"green"}}>Completed</td>
                                        )}
                                    <td className="product-remove" data-title="Remove">
                                    <div className="btn-group align-top">
                                        <button 
                                            onClick={()=>toggle(item.id)}
                                            className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                            <i className="tf-ion-ios-eye"></i>
                                        </button>
                                        {item.status ==="1"?
                                            <button
                                                onClick={()=>toggleConfirmBox(item.id)}
                                                //onClick={()=>handleCancel(item.id)}
                                                className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                                <i className="tf-ion-android-delete"></i>
                                            </button>
                                            :<></>
                                        }
                                    </div>
                                    </td>
                                </tr>
                                
                                    ))}
                                {/* <tr>
                                    <td colspan="6" className="actions">
                                        <div className="coupon">
                                            <input type="text" name="coupon_code" className="input-text form-control" id="coupon_code" value="" placeholder="Coupon code" /> 
                                            <button type="button" className="btn btn-black btn-small" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                            <span className="float-right mt-3 mt-lg-0">
                                            <button type="button" className="btn btn-dark btn-small" name="update_cart" value="Update cart" disabled="">Update cart</button>
                                            </span>
                                        </div>
                                        <input type="hidden" id="woocommerce-cart-nonce" name="woocommerce-cart-nonce" value="27da9ce3e8" />
                                        <input type="hidden" name="_wp_http_referer" value="/cart/" />
                                        </td>
                                </tr> */}
                                </tbody>
                            </table>
                        </form>
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
