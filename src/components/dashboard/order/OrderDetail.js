import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrdersByUserId, getOrderById, getAllOrders } from '../../../redux/actions/OrderAction'

const OrderDetail = ({isShowing, hide, id}) => {
    const dispatch = useDispatch();

    const orderDetail = useSelector((state) => state.orderDetail);
    const { order, lineItems} = orderDetail;

    useEffect(() => {
        if(isShowing&&order.id!==id){
            dispatch(getOrderById(id));
        }
    }, [dispatch, id, isShowing]);
    console.log(order)
  if(!isShowing) return null;
  return (
    <>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Order Detail</h5>
                    <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="py-1">
                    {/* {loading ? (
                        <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : ( */}
                        <section class="cart shopping">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="mb-4">Information Order</h4>
                        <ul class="list-unstyled mb-4">
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Orderer</h5>
                            <span>{order.createdBy}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Receiver</h5>
                            <span>{order.name}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Phone</h5>
                            <span>{order.phoneNumber}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Total Item</h5>
                            <span>{lineItems.length}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2">
                            <h5>Total Price</h5>
                            <span>{order.totalPrice}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="product-list">
                        <form class="cart-form">
                            <table class="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th class="product-thumbnail"> </th>
                                        <th class="product-name">Product</th>
                                        <th class="product-price">Price</th>
                                        <th class="product-quantity">Amount</th>
                                        <th class="product-subtotal">Total</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                            
                                    {lineItems&&lineItems.map(item=>(
                                        <tr class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                        <a href="/product-single"><img src={item.product.images.sort((a,b)=>(a.id-b.id))[0].link} class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></a>
                                    </td>
                                    <td class="product-name" data-title="Product">
                                        <a href="#">aaaa</a>
                                    </td>
                                    <td class="product-price" data-title="Price">
                                        <span class="amount"><span class="currencySymbol"><pre wp-pre-tag-3=""></pre>
                                        </span>{item.product.price}</span>
                                    </td>
                                    <td class="product-quantity" data-title="Quantity">
                                        {item.amount}
                                    </td>
                                    <td class="product-subtotal" data-title="Total">
                                        <span class="amount">
                                            <span class="currencySymbol">
                                                <pre wp-pre-tag-3=""></pre>
                                            </span>
                                            {item.total}
                                        </span>
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
                </div>
                </section>
                        
                        {/* )} */}
                    </div>
                </div>
            </div>
        </div>
    </div>
</>

  )
}

export default OrderDetail
