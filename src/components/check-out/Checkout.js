import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishListById,removeLineItem,updateLineItem } from '../../redux/actions/WishlistAction'
import {
    LINE_ITEM_UPDATE_RESET,
    ORDER_CREATE_RESET,
    VOUCHER_DETAILS_STOP
} from '../../redux/constants/Constants'
import { createOrder } from '../../redux/actions/OrderAction'
import Input from '../checkValidate/Input'
import Radio from '../checkValidate/Radio'
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from '../../redux/actions/UserAction'

import {toast} from 'react-toastify';
import Checkbox from '../checkValidate/Checkbox';
import Loading from "../loadingError/Loading";
import { searchVoucher } from "../../redux/actions/VoucherAction";
import Message from "../loadingError/Message";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CLIENT_ID } from '../../config/Config'
import LoadingCustom from "../loadingError/LoadingCustom";
import './Voucher.css'
const paymentList = [
    { value: "0", label: "At Store" },
    { value: "1", label: "PAYPAL" },
    { value: "2", label: "COD" }
  ];

const Checkout = () => {
    
    const [pos, setPos]=useState();
    const [timer,setTimer]=useState(null);
    const [infoVoucher, setInfoVoucher]=useState({
        name: ''
    })
    const [form, setForm] = useState({
        email: '',
        address: '',
        phoneNumber: '',
        name: '',
        status: null,      //status = 0 : cancle, 1 : wait confirm, 2: shipping, 3: completed 
        createdDate: '',
        createdBy: '',
        totalPrice: null,
        feeShip: "0",
        voucher: "0",
        vat: "0.1",
        paymentStatus: "0",
        paymentType: "0",
        transactionCode: null,
        orderPrice: null
    });
    const [amounts, setAmounts] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lineItemList = useSelector((state) => state.lineItemList);
    const { loading, error, lineItems, user} = lineItemList;

    const lineItemUpdate = useSelector((state) => state.lineItemUpdate);
    const { success: succsesUpdate, error: errorUpdate, loading: loadingUpdate } = lineItemUpdate;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { success: succsesCreate, loading: loadingCreate } = orderCreate;

    const voucherDetail = useSelector((state) => state.voucherDetail);
    const { success: successgetVoucher, error: errorVoucher, voucher } = voucherDetail;

    var today = new Date();
    var amountItem=0;
    const totalPrice = lineItems.reduce(function (result, item) {
        amountItem++;
        return result + Number(item.total);
      },0);

    //Paypal
    const [show, setShow] = useState(false);
    const [successPayPal, setSuccessPayPal] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    useEffect(() =>{
        if (succsesCreate) {
            dispatch({type: ORDER_CREATE_RESET});
            dispatch(getWishListById());
            navigate("/thank")
        } else {
            setForm(prev => ({
                ...prev,
                email: user.email,
                address: user.address,
                phoneNumber: user.phone,
                name: user.name,
                status: 1,      //status = 0 : cancle, 1 : wait confirm, 2: shipping, 3: completed 
                createdDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(),
                createdBy: userInfo.username,
                totalPrice: totalPrice
            }))
        }
        if(successPayPal){
            handleOrder();
            setSuccessPayPal(false);
        }
        if(successgetVoucher){
            dispatch({type: VOUCHER_DETAILS_STOP});
            setForm(prev => ({
                ...prev,
                voucher: voucher.value,
            }))
            setOrderID(false);
        }
    },[succsesCreate, user, successgetVoucher, successPayPal])

    const [valueCurrent, setValueCurrent]=useState();

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
        paymentType: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        email: {
            isReq: true,
            reqType: 'EMAIL',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        phoneNumber: {
            isReq: true,
            reqType: 'PHONE',
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

    const handleVoucher = () => {
        dispatch(searchVoucher({infoVoucher}))
    }

    // const voucherChange = useCallback(() => {
    //     if(successgetVoucher){
    //     dispatch({type: VOUCHER_DETAILS_STOP});
    //     setForm(prev => ({
    //         ...prev,
    //         voucher: voucher.value
    //     }));}
    // }, [successgetVoucher]);
    const handleDeleteVoucher = () => {
        setForm(prev=>({
            ...prev,
            voucher:"0",
        }))
        setInfoVoucher({name: ''})
        setOrderID(false);
    }

    // creates a paypal order
    const createOrders = (data, actions) => {
        return actions.order
        .create({
            purchase_units: [
            {
                description: "sassss",
                amount: {
                    currency_code: "USD",
                    value: Math.round((Number(totalPrice)+Number(form.feeShip)+Number(totalPrice)*0.1-totalPrice*Number(form.voucher))*100)/100,
                },
            },
            ],
            // not needed if a shipping address is actually needed
            application_context: {
                shipping_preference: "NO_SHIPPING",
            },
        })
        .then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };
    const [d,setD]=useState()
    // check Approval
    const onApprove = (data, actions, variables) => {
        return actions.order.capture().then(function (details) {
            const { purchase_units
            } = details;
            setForm(prev=>({...prev, transactionCode: purchase_units[0]?.payments.captures[0]?.id}))
            setSuccessPayPal(true);
        });
    };

console.log('k',form)
    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };
console.log(form.voucher);
    return (
        <>
        {
            loadingCreate&&<LoadingCustom content='Creating'/>
        }
        <div className="checkout-container">
            <section className="page-header">
            <div className="overly"></div> 	
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                <div className="content text-center">
                    <h1 className="mb-3">Checkout</h1>
                    {/* <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p> */}
        
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </nav>
                </div>
                </div>
            </div>
            </div>
        </section>
        <div className="page-wrapper">
            <div className="checkout shopping">
                <div className="container">
                <div className="row">
                <div className="col-md-6 col-lg-4">
                        <div className="product-checkout-details mt-5 mt-lg-0">
                            <h4 className="mb-2 border-bottom pb-2 text-center">Order Summary</h4>
                            
                                {lineItems&&lineItems.sort((a,b)=>(a.id-b.id)).map(item=>(
                                    <ul className="list-unstyled border-bottom">
                                        <li className="d-flex justify-content-between mb-1">
                                            <Link to={`/product/${item.product.id}`}>
                                                <img className="media-object mr-3" style={{width: "70px"}} src={item.product.images[0]?.link} alt="image" />
                                            </Link>
                                            <span style={{width: "160px"}}>
                                                <h6 className="font-weight-bold">{item.product.name}</h6>
                                                Size: {item.size} UK   
                                                <br/>
                                                Total: {item.amount} x ${item.product.price} = ${item.total}
                                            </span>
                                        </li>
                                    </ul>
                                   
                            ))}
                           
                           
                           <form className="mb-1">
                           {form.voucher==="0"&&
                           <>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Enter Coupon Code" onChange={(e)=>setInfoVoucher({name: e.target.value})} />
                                </div>
                                {errorVoucher &&
                                        <Message variant="alert-danger">Not Found Voucher</Message>
                                    }
                                {infoVoucher.name!=''&&
                                <div className="text-right">
                                    <button type="button" className="btn btn-success btn-small r-0"onClick={handleVoucher}>Apply Voucher</button> 
                                </div>
                                }
                                </>||
                                <div className="voucher text-center" 
                                    // style={{WebkitMaskImage:"radial-gradient(circle at 10px, transparent 10px, red 10.5px)",
                                    //         WebkitMaskPosition:"-10px", WebkitMaskSize: "100% 20px"
                                    // }}
                                //     style={{
                                //         backgroundColor: "#99FF66", borderRadius: "10px", width: "300px", height:"100px"
                                // }}
                                >
                                
                                <li className="d-flex h-100">
                                    <span className="" style={{ width: "100px"}}>
                                        <h6 className="font-weight-bold mt-4">Discount</h6>
                                        {Math.round(voucher.value*100)}%
                                    </span>
                                    <span style={{width: "200px"}}>
                                        <h6 className="font-weight-bold mt-4 text-center">Voucher</h6>
                                        {voucher.name}
                                    </span>
                                    <span style={{width: "20px"}}>
                                        <h6 className="font-weight-bold" style={{cursor: "pointer", color: "white", height: "20px"}} onClick={handleDeleteVoucher} >x</h6>
                                    </span>
                                </li>
                                </div> }
                            </form>
                            <ul className="summary-prices list-unstyled mb-4">
                                <li className="d-flex justify-content-between">
                                    <span >Subtotal:</span>
                                    <span className="h5" style={{width: "60px"}}>${totalPrice}</span>
                                </li>
                                {form.paymentType!=="0"&&
                                <li className="d-flex justify-content-between">
                                    <span >Shipping:</span>
                                    <span className="h5" style={{width: "60px"}}>$30</span>
                                </li>}
                                <li className="d-flex justify-content-between">
                                    <span >VAT:</span>
                                    <span className="h5" style={{width: "60px"}}>10%</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span>Total:</span>
                                    <span className="h5" style={{width: "60px"}}>${Math.round((Number(totalPrice)+Number(form.feeShip)+Number(totalPrice)*0.1-totalPrice*Number(form.voucher))*100)/100}</span>
                                </li>
                            </ul>
        
                            {/* <form action="#">
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                    <label className="form-check-label" for="exampleRadios1">
                                    Direct bank transfer 
                                    </label>
        
                                    <div className="alert alert-secondary mt-3" role="alert">
                                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                    </div>
                                </div>
        
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                    <label className="form-check-label" for="exampleRadios2">
                                    Check payments 
                                    </label>
                                </div>
        
                                <div className="form-check mb-3">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck3" />
                                    <label className="form-check-label" for="exampleCheck3">I have read and agree to the website terms and conditions *</label>
                                    </div>
                            </form>
         */}
                            
                        </div>
                    </div>
                


                    <div className="col-lg-8 pr-5">
                        <div className="billing-details">
                            <h4 className="mb-2 pb-2 text-center">Billing Details</h4>
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
                                                name="email"
                                                title="Email"
                                                value={form.email}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.email}
                                            />
                                            <Input
                                                name="phoneNumber"
                                                title="Phone Number"
                                                value={form.phoneNumber}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.phoneNumber}
                                            />
                                            {/* <Radio
                                                name="paymentType"
                                                title="Payment Type"
                                                value={form.paymentType}
                                                options={paymentList}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.paymentType}
                                            /> */}
                                            <label className="form-label">Payment Type</label>
                                            <div class="card-body"> 
                                                {paymentList.map(item=>(
                                                    <label class="checkbox-btn mr-1">
                                                        <input type="radio" className="hide" name="myfilter_radio" value={item.value} onChange={(e)=>setForm(prev => ({...prev, paymentType: e.target.value, feeShip: e.target.value==="0"?0:30, orderPrice: totalPrice + form.feeShip}))} />
                                                        <span class={form.paymentType===item.value?"btn btn-light active":"btn btn-light"}>{item.label}</span>
                                                    </label>
                                                ))}
                                            </div>		
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    
                            <div className="form">
                            <div className="col text-center px-xl-3">

                            {form.paymentType==="1"?
                                <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                                <PayPalButtons
                                    style={{ layout: "horizontal" }}
                                    createOrder={createOrders}
                                    onApprove={onApprove}
                                    forceReRender={[form.voucher,form.feeShip]}
                                />
                            </PayPalScriptProvider>:
                                <button 
                                    onClick={()=>setSuccessPayPal(true)}
                                    className="button-33" style={{width: "300px"}}
                                >Order</button>
                            }  
                            </div>
                            </div>
                        </div>
                    </div>
        
                    
                    
                </div>
                </div>
            </div>
        </div>
        
        
       
            <div className="modal fade" id="coupon-modal" tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                <div className="modal-content py-5">
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                            <input className="form-control" type="text" placeholder="Enter Coupon Code" />
                            </div>
                            <button type="button" className="btn btn-main btn-small" data-dismiss="modal">Apply Coupon</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Checkout;