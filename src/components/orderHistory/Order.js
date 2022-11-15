import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from '../../redux/actions/CartAction'
import { getWishListById,removeLineItem } from '../../redux/actions/WishlistAction'
import { createOrder, getOrdersByUserId, getOrderById } from '../../redux/actions/OrderAction'
import OrderDetail from "./OrderDetail";
import useModal from '../dashboard/useModal';
const Order = () => {
    const {isShowing, toggle, id} = useModal();
    const dispatch = useDispatch();

    const orderListByUserId = useSelector((state) => state.orderListByUserId);
    const { loading, error, orders} = orderListByUserId;
    useEffect(()=>{
        dispatch(getOrdersByUserId());
    },[dispatch])
    orders.sort((a,b)=>(a.id-b.id))
  return (
    <>
    <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="product-list">
                        <form class="cart-form">
                            <table class="table shop_table cart" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="product-thumbnail">Id</th>
                                        <th class="product-name">Order Date</th>
                                        <th class="product-quantity">Amount Item</th>
                                        <th class="product-subtotal">Total</th>
                                        <th class="product-price">State</th>
                                        <th class="product-remove">Action</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {orders&&orders.map(item=>(
                                        <tr class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                        {item.id}
                                    </td>
                                    <td class="product-name" data-title="Product">
                                        {item.createdDate}
                                    </td>
                                    <td class="product-price" data-title="Price">
                                        {item.amountItem}
                                    </td>
                                    <td class="product-quantity" data-title="Quantity">
                                       {item.totalPrice}
                                    </td>
                                    <td class="product-subtotal" data-title="Total">
                                            {item.status}
                                    </td>
                                    <td class="product-remove" data-title="Remove">
                                        <button 
                                            onClick={()=>toggle(item.id)}
                                            className="btn btn-sm btn-outline-secondary badge" type="button"> 
                                            <i className="tf-ion-ios-eye"></i>
                                        </button>
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
            </>
  )
}

export default Order
