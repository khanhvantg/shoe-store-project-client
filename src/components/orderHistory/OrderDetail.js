
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrdersByUserId, getOrderById, getAllOrders } from '../../redux/actions/OrderAction'
import { Link } from "react-router-dom";
const OrderDetail = ({isShowing, hide, id}) => {
    const dispatch = useDispatch();

    const orderDetail = useSelector((state) => state.orderDetail);
    const { order, lineItems} = orderDetail;

    console.log(lineItems)
    useEffect(() => {
        if(isShowing&&order.id!==id){
            dispatch(getOrderById(id));
        }
    }, [dispatch, order, id, isShowing]);
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
                        <section className="cart shopping page-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="product-list">
                        <form className="cart-form">
                            <table className="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th className="product-thumbnail"> </th>
                                        <th className="product-name">Product</th>
                                        <th className="product-price">Price</th>
                                        <th className="product-quantity">Amount</th>
                                        <th className="product-quantity">Size</th>
                                        <th className="product-subtotal">Total</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {lineItems&&lineItems.map(item=>(
                                        <tr className="cart_item">
                                    <td className="product-thumbnail" data-title="Image">
                                        <Link to={{ pathname: `/product/${item.product.id}`}}><img src={item.product.images.sort((a,b)=>(a.id-b.id))[0].link} className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></Link>
                                    </td>
                                    <td className="product-name" data-title="Product">
                                        <span className="amount">${item.product.price}</span>
                                    </td>
                                    <td className="product-price" data-title="Price">
                                        <span className="amount">
                                            {/* <span className="currencySymbol"><pre wp-pre-tag-3=""></pre>
                                        </span> */}
                                        ${item.product.price}</span>
                                    </td>
                                    <td className="product-quantity" data-title="Amount">
                                        {item.amount}
                                    </td>
                                    <td className="product-quantity" data-title="Size">
                                        {item.size} UK
                                    </td>
                                    <td className="product-subtotal" data-title="Total">
                                        <span className="amount">
                                            {/* <span className="currencySymbol">
                                                <pre wp-pre-tag-3=""></pre>
                                            </span> */}
                                            ${item.total}
                                        </span>
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
