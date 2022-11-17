import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishListById,removeLineItem } from '../../redux/actions/WishlistAction'
import { createOrder } from '../../redux/actions/OrderAction'
import Input from '../checkValidate/Input'
const Cart = () => {
    const dispatch = useDispatch();

    const lineItemList = useSelector((state) => state.lineItemList);
    const { loading, error, lineItems, user} = lineItemList;
    const totalPrice = lineItems.reduce(function (result, item) {
        amountItem++;
        return result + Number(item.total);
      },0);
    useEffect(()=>{
        dispatch(getWishListById());
    }, [dispatch])

    lineItems.sort((a,b)=>(a.id-b.id));
    var amountItem=0;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var today = new Date();
    const [form, setForm] = useState({
        address: user.address,
        phoneNumber: user.phone,
        name: user.name,
        status: 1,      //status = 0 : cancle, 1 : wait confirm, 2: shipping, 3: completed 
        createdDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(),
        createdBy: userInfo.username,
        modifiedBy: "",
        modifiedDate: "",
        totalPrice
    });
    console.log("b",form)
  
    
    const handleRemoveItem = (id) => {
        dispatch(removeLineItem(id));
    }

    const onInputValidate = (value, name) => {
        setErrorInput(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
        }
         
    const [errorInput, setErrorInput] = useState({
        name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        address: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        phoneNumber: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        }
    });
         
    const onInputChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);
        
    const validateForm = () => {
        let isInvalid = false;
        Object.keys(errorInput).forEach(x => {
            const errObj = errorInput[x];
            if (errObj.errorMsg) {
                isInvalid = true;
            } else if (errObj.isReq && !form[x]) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }
        
    const handleOrder = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(createOrder({form}));
        }
    }
  return (
        <div className="checkout-container">
            <section class="page-header">
            <div class="overly"></div> 	
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                <div class="content text-center">
                    <h1 class="mb-3">Cart</h1>
                    Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which
        
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Cart</li>
                    </ol>
                </nav>
                </div>
                </div>
            </div>
            </div>
        </section>
            <section class="cart shopping page-wrapper">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-12">
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
                                        <th class="product-remove"> </th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {lineItems&&lineItems.map(item=>(
                                        <tr class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                        <a href="/product-single"><img src={item.product.images.sort((a,b)=>(a.id-b.id))[0].link} class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></a>
                                    </td>
                                    <td class="product-name" data-title="Product">
                                        <a href="#">{item.product.name}</a>
                                    </td>
                                    <td class="product-price" data-title="Price">
                                        <span class="amount"><span class="currencySymbol"><pre wp-pre-tag-3=""></pre>
                                        </span>{item.product.price}</span>
                                    </td>
                                    <td class="product-quantity" data-title="Quantity">
                                        <div class="quantity">
                                            <label class="sr-only" >Amount</label>
                                            <input 
                                                //onChange={(e)=>handle(item.amount)}
                                                name="item.amount" 
                                                value={item.amount}
                                                type="number" class="input-text qty text" step="1" min="0" max="9" title="Qty" size="4"  />
                                        </div>
                                    </td>
                                    <td class="product-subtotal" data-title="Total">
                                        <span class="amount">
                                            <span class="currencySymbol">
                                                <pre wp-pre-tag-3=""></pre>
                                            </span>
                                            {item.total}
                                        </span>
                                    </td>
                                    <td class="product-remove" data-title="Remove">
                                        <a onClick={()=>handleRemoveItem(item.id)} class="remove" aria-label="Remove this item" data-product_id="30" data-product_sku="">×</a>
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
                <div class="row justify-content-end">
                <div class="col-lg-4">
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="mb-4">Cart totals</h4>
                        <ul class="list-unstyled mb-4">
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Subtotal</h5>
                            <span>{totalPrice}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Shipping</h5>
                            <span>Free</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2">
                            <h5>Total</h5>
                            <span>{totalPrice}</span>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div class="col-lg-8">
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="text-center mb-4">Delivery Information</h4>
                        <div className="form">
                            <div className="row">
                                <div className="col">
                                    <div className="col">
                                        <div className="form-group">
                                            <Input
                                                name="name"
                                                title="Name"
                                                value={form.name}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.name}
                                                />
                                            <Input
                                                name="address"
                                                title="Address"
                                                value={form.address}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.address}
                                            />
                                            <Input
                                                name="phoneNumber"
                                                title="Phone Number"
                                                value={form.phoneNumber}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.phoneNumber}
                                            />
                                            {/* <label>Name</label>
                                                <input 
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="form-control" type="text" name="name" placeholder/>
                            
                                <label>Phone</label>
                                <input 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="form-control" type="text" name="phoneNumber" placeholder/>            
                            
                                <label>Address</label>
                                    <input 
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control" type="text" name="addrees" placeholder/> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="col text-center px-xl-3">
                        <button 
                            onClick={handleOrder}
                            class="btn btn-primary btn-block">Order</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    )
}

export default Cart