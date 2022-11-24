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
const Order = () => {
    const {isShowing, toggle, id} = useModal();
    const {isShowing:isShowConfirmBox, toggle:toggleConfirmBox, id: idOrder} = useModal();
    //const [isShowConfirmBox, setIsShowConfirmBox]=useState(false)
    //const {isShowing: isShowConfirmBox, toggle: toggleShow} = useModal();
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
        //setIsShowConfirmBox(true)
        dispatch(updateOrder({orderInfo}));
    }
  return (
    <div className="checkout-container">
    <section class="cart shopping page-wrapper">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="product-list">
                        <form class="cart-form">
                            <table class="table cart" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="product-thumbnail">OrderId</th>
                                        <th class="product-name">Date</th>
                                        {/* <th class="product-quantity">Amount Item</th> */}
                                        <th class="product-subtotal">Total</th>
                                        <th class="product-price">State</th>
                                        <th class="product-remove">Action</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {orders&&orders.sort((a,b)=>(a.id-b.id)).map(item=>(
                                        <tr class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                        {item.id}
                                    </td>
                                    <td class="product-name" data-title="Product">
                                        {item.createdDate}
                                    </td>
                                    {/* <td class="product-price" data-title="Price">
                                        {item.amountItem}
                                    </td> */}
                                    <td class="product-quantity" data-title="Quantity">
                                       {item.totalPrice}
                                    </td>
                                    {/* <td class="product-subtotal" data-title="Total">
                                            {item.status}
                                    </td> */}
                                    {item.status ==="0" ? (
                                            <td className="text-nowrap align-middle" style={{color:"red"}}>Cancelled</td>
                                        ):item.status ==="1" ?(
                                            <td className="align-middle"  style={{color:"gold"}}>Waiting Confirm</td>
                                        ):item.status ==="2" ?(
                                            <td className="align-middle" style={{color:"blue"}}>Shipping</td>
                                        ):(
                                            <td className="align-middle" style={{color:"green"}}>Shipped</td>
                                        )}
                                    <td class="product-remove" data-title="Remove">
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
                                    <td colspan="6" class="actions">
                                        <div class="coupon">
                                            <input type="text" name="coupon_code" class="input-text form-control" id="coupon_code" value="" placeholder="Coupon code" /> 
                                            <button type="button" class="btn btn-black btn-small" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                            <span class="float-right mt-3 mt-lg-0">
                                            <button type="button" class="btn btn-dark btn-small" name="update_cart" value="Update cart" disabled="">Update cart</button>
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
