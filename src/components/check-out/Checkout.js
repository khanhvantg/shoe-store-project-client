import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishListById } from '../../redux/actions/WishlistAction'
import {
    ORDER_CREATE_RESET,
    VOUCHER_DETAILS_STOP
} from '../../redux/constants/Constants'
import { createOrder } from '../../redux/actions/OrderAction'
import Input from '../checkValidate/Input'
import Select from '../checkValidate/Select'
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from '../../redux/actions/UserAction'

import { toast } from 'react-toastify';
import Checkbox from '../checkValidate/Checkbox';
import Loading from "../loadingError/Loading";
import { searchVoucher } from "../../redux/actions/VoucherAction";
import Message from "../loadingError/Message";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CLIENT_ID } from '../../config/Config'
import LoadingCustom from "../loadingError/LoadingCustom";
import './Voucher.css'
import axios from "axios";
import { format } from 'date-fns'
const paymentList = [
    // { value: "0", label: "At Store" },
    { value: "2", label: "COD" },
    { value: "1", label: "PAYPAL" }
];

const Checkout = () => {
    const [form, setForm] = useState({
        email: '',
        address: '',
        phoneNumber: '',
        name: '',
        status: 1,      //status = 0 : cancle, 1 : wait confirm, 2: shipping, 3: completed 
        createdDate: '',
        createdBy: '',
        totalPrice: null,
        feeShip: "0",
        voucher: "0",
        vat: "0.1",
        paymentStatus: "0",
        paymentType: "2",
        transactionCode: null,
        orderPrice: null,
        estimatedDate: null,
        numberDetail: "",
        city: null,
        district: null,
        ward: null,
        service: null
    });

    const [formCheck, setFormCheck] = useState({
        city: null,
        district: null,
        ward: null
    })

    const [pos, setPos] = useState();
    const [timer, setTimer] = useState(null);
    const [infoVoucher, setInfoVoucher] = useState({
        name: ''
    })

    const [amounts, setAmounts] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lineItemList = useSelector((state) => state.lineItemList);
    const { loading, error, lineItems, user } = lineItemList;

    var today = new Date();
    var amountItem = 0;
    const totalPrice = lineItems.reduce(function (result, item) {
        amountItem++;
        return result + Number(item.total);
    }, 0);

    const lineItemUpdate = useSelector((state) => state.lineItemUpdate);
    const { success: succsesUpdate, error: errorUpdate, loading: loadingUpdate } = lineItemUpdate;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { success: succsesCreate, loading: loadingCreate } = orderCreate;

    const voucherDetail = useSelector((state) => state.voucherDetail);
    const { success: successgetVoucher, error: errorVoucher, voucher } = voucherDetail;

    const dataNumberDetail = useSelector((state) => state.dataNumberDetail);
    const { dataNumber } = dataNumberDetail;
    console.log(dataNumber)
    //Paypal
    const [show, setShow] = useState(false);
    const [successPayPal, setSuccessPayPal] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [check, setCheck] = useState(true);

    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [formAddress, setFormAddress] = useState({
        city: null,
        district: null,
        ward: null
    })
    const [reLoad, setReLoad] = useState(true)
    useEffect(() => {
        setForm(prev => ({ ...prev, address: (form.numberDetail !== "" ? (form.numberDetail + ", ") : "") + (form.ward !== null ? (form.ward + ", ") : "") + (form.district !== null ? (form.district + ", ") : "") + (form.city !== null ? form.city : "") }))
        if (succsesCreate) {
            dispatch({ type: ORDER_CREATE_RESET });
            dispatch(getWishListById());
            navigate("/thank")
        } else if (successPayPal) {
            handleOrder();
            setSuccessPayPal(false);
        } else if (successgetVoucher) {
            dispatch({ type: VOUCHER_DETAILS_STOP });
            setForm(prev => ({
                ...prev,
                voucher: voucher.value,
            }))
            setOrderID(false);
            setCheck(false);
        } else {
            getCity();
            if (form.city !== null) {
                getDistrict();
                if (form.district !== null) {
                    getService();
                    getWard();
                    if (form.ward !== null) {
                        getFee();
                        getEstimatedDate();
                    } else { setForm(prev => ({ ...prev, feeShip: "0", estimatedDate: null })); }
                } else { setWard([]); reSetAddress("ward"); setForm(prev => ({ ...prev, feeShip: "0", estimatedDate: null })); }
            } else { setDistrict([]); setWard([]); reSetAddress("district"); reSetAddress("ward"); setForm(prev => ({ ...prev, feeShip: "0", estimatedDate: null })); }
            if (reLoad && check) {
                setForm(prev => ({
                    ...prev,
                    email: user.email,
                    phoneNumber: user.phone,
                    name: user.name,
                    status: 1,      //status = 0 : cancle, 1 : wait confirm, 2: shipping, 3: completed 
                    createdDate: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                    createdBy: userInfo.username,
                    vat: (Number(dataNumber.value)/100).toString(),
                    totalPrice: totalPrice
                }))
            }
        }
        // setCheck(true)
    }, [succsesCreate, user, successgetVoucher, successPayPal, form.city, form.district, form.ward, form.numberDetail, form.paymentType])

    //API GHN
    const authHeader = () => {
        return {
            'Content-Type': 'application/json',
            'token': 'd7924ae8-da8b-11ed-921c-de4829400020',
        };
    }
    const getCity = async () => {
        const arr = [];
        await axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", { headers: authHeader() }).then((res) => {
            let result = res.data.data;
            result.map((item) => {
                return arr.push({ value: item.ProvinceID, label: item.NameExtension[1] });
            });
            setCity(arr)
        });
    };
    const getDistrict = async () => {
        const arr = [];
        await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${formAddress.city}`, { headers: authHeader() }).then((res) => {
            let result = res.data.data;
            result.map((item) => {
                return arr.push({ value: item.DistrictID, label: item.DistrictName });
            });
            setDistrict(arr)
        });
        // setFormAddress(prev=>({
        //     ...prev,
        //     district: "Huyện Cần Giờ"
        // }))
    };
    const getWard = async () => {
        const arr = [];
        await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${formAddress.district}`, { headers: authHeader() }).then((res) => {
            let result = res.data.data;
            result.map((item) => {
                return arr.push({ value: item.WardCode, label: item.WardName });
            });
            setWard(arr)
        });
    };
    const getFee = async () => {
        const inforDelivery = {
            service_id: form.service,
            insurance_value: totalPrice,
            coupon: null,
            from_district_id: 3695,
            to_district_id: formAddress.district,
            to_ward_code: (formAddress.ward).toString(),
            height: 15,
            length: 25,
            weight: 700,
            width: 20
        }
        if(totalPrice<1000){
            await axios.post("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", inforDelivery, { headers: authHeader() }).then((res) => {
                let result = res.data.data;
                setForm(prev => ({ ...prev, feeShip: Math.round((result.total / 23400) * 100) / 100 }))
            });
        }
    };
    const getService = async () => {
        const inforDelivery = {
            shop_id: 4028563,
            from_district: 3695,
            to_district: formAddress.district,
        }
        await axios.post("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services", inforDelivery, { headers: authHeader() }).then((res) => {
            let result = res.data.data;
            setForm(prev => ({ ...prev, service: result[0].service_id }))
        });
    };
    const getEstimatedDate = async () => {
        const inforDelivery = {
            service_id: form.service,
            from_district_id: 3695,
            from_ward_code: "90742",
            to_district_id: formAddress.district,
            to_ward_code: (formAddress.ward).toString(),
        }
        await axios.post("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime", inforDelivery, { headers: authHeader() }).then((res) => {
            let result = res.data.data.leadtime.toString() + "000";
            var date1 = new Date(Number(result))
            const d = format(date1, "dd/MM/yyyy")
            setForm(prev => ({ ...prev, estimatedDate: d.toString() }))
            //   const time = today.getDate() + Math.round(Number(result.slice(3,5)) + Number(result.slice(5)/86400) - today.getDate())
            //   setForm(prev=>({...prev, estimatedDate: time  + "/" + (today.getMonth() + 1) +"/" + today.getFullYear()}))
        });
    };

    const getUSDTransfer = async () => {

        await axios.get("https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10", { headers: "Content-Type: application/json", }).then((res) => {
            let result = res.data.data;
            //   setForm(prev=>({...prev, estimatedDate: result.leadtime}))
        });
    };
    const getOTP = async () => {
        const phone = {
            phone: form.phoneNumber,
        }
        await axios.post("https://online-gateway.ghn.vn/shiip/public-api/v2/shop/affiliateOTP", phone, { headers: authHeader() }).then((res) => {
            let result = res.data.data;
            //   setForm(prev=>({...prev, estimatedDate: result.leadtime}))
        });
    };
    const reSetAddress = (name) => {
        setForm(prev => ({
            ...prev,
            [name]: null
        }));
        setFormAddress(prev => ({
            ...prev,
            [name]: null
        }));
    };

    const [valueCurrent, setValueCurrent] = useState();

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
        numberDetail: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        city: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        district: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        ward: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        // address: {
        //     isReq: true,
        //     errorMsg: '',
        //     onValidateFunc: onInputValidate
        // },
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

    const onSelectChange = useCallback((label, value, name) => {
        if (name === "city") {
            if (value !== formAddress.city) {
                setReLoad(false);
                setForm(prev => ({
                    ...prev,
                    district: null
                }));
            }
        } else if (name === "district") {
            if (value !== formAddress.district) {
                setReLoad(false);
                setForm(prev => ({
                    ...prev,
                    ward: null
                }));
            }
        } else {
            if (value !== formAddress.ward) {
                setReLoad(false);
            }
        }
        setForm(prev => ({
            ...prev,
            [name]: label
        }));
        setFormAddress(prev => ({
            ...prev,
            [name]: value
        }));
    }, [formAddress]);

    const onInputChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // const onInputChange1 = useCallback((id,name) => {
    //     setFormAddress(prev => ({
    //         ...prev,
    //         [name]: label
    //     }));
    // }, []);
    const onAdressChange = useCallback((value, name) => {
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
            } else if (errObj.isReq && (Array.isArray(form[x]) ? !form[x].length : !form[x]) /*!form[x]*/) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const handleOrder = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(createOrder({ form }));
        }
    }

    const handleVoucher = () => {
        dispatch(searchVoucher({ infoVoucher }))
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
        setForm(prev => ({
            ...prev,
            voucher: "0",
        }))
        setInfoVoucher({ name: '' })
        setOrderID(false);
    }

    // creates a paypal order
    const onClick = (data, actions) => {
        const isValid = validateForm();
        if (isValid) {
            return actions.resolve();
        } else {
            return actions.reject();
        }
    }

    const createOrders = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Thanks for your purchase",
                        amount: {
                            currency_code: "USD",
                            value: Math.round((Number(totalPrice) + Number(form.feeShip) + Number(totalPrice) * 0.1 - totalPrice * Number(form.voucher)) * 100) / 100,
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
    // const [d,setD]=useState()
    // check Approval
    const onApprove = (data, actions, variables) => {
        return actions.order.capture().then(function (details) {
            const { purchase_units
            } = details;
            setForm(prev => ({ ...prev, transactionCode: purchase_units[0]?.payments.captures[0]?.id }))
            setSuccessPayPal(true);
        });
    };
    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };
    console.log(voucher.name)
    return (
        <>
            {
                loadingCreate && <LoadingCustom content='Creating' />
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

                                        {lineItems && lineItems.sort((a, b) => (a.id - b.id)).map(item => (
                                            <ul className="list-unstyled border-bottom">
                                                <li className="d-flex justify-content-between mb-1">
                                                    <Link reloadDocument={true}  to={`/product/${item.product.id}`}>
                                                        <img className="media-object mr-3" style={{ width: "70px" }} src={item.product.images[0]?.link} alt="image" />
                                                    </Link>
                                                    <span style={{ width: "160px" }}>
                                                        <h6 className="font-weight-bold">{item.product.name}</h6>
                                                Size: {item.size} UK
                                                <br />
                                                Total: {item.amount} x ${item.product.price} = ${item.total}
                                                    </span>
                                                </li>
                                            </ul>

                                        ))}


                                        <form className="mb-1">
                                            {form.voucher === "0" &&
                                                <>
                                                    <div className="form-group">
                                                        <input className="form-control" type="text" placeholder="Enter Coupon Code" onChange={(e) => setInfoVoucher({ name: e.target.value })} />
                                                    </div>
                                                    {errorVoucher &&
                                                        <Message variant="alert-danger">Not Found Voucher</Message>
                                                    }
                                                    {infoVoucher.name !== '' &&
                                                        <div className="text-right">
                                                            <button type="button" className="button-1" onClick={handleVoucher}>Apply Voucher</button>
                                                        </div>
                                                    }
                                                </> ||
                                                <div className="voucher text-center">
                                                    <li className="d-flex h-100">
                                                        <span className="" style={{ width: "100px" }}>
                                                            <h6 className="font-weight-bold mt-4">Discount</h6>
                                                            {Math.round(voucher.value * 100)}%
                                                        </span>
                                                        <span style={{ width: "200px" }}>
                                                            <h6 className="font-weight-bold mt-4 text-center">Voucher</h6>
                                                            {voucher.name}
                                                        </span>
                                                        <span style={{ width: "20px" }}>
                                                            <h6 className="font-weight-bold" style={{ cursor: "pointer", color: "white", height: "20px" }} onClick={handleDeleteVoucher} >x</h6>
                                                        </span>
                                                    </li>
                                                </div>}
                                        </form>
                                        <ul className="summary-prices list-unstyled mb-4">
                                            <li className="d-flex justify-content-between">
                                                <span >Subtotal:</span>
                                                <span className="h5" style={{ width: "100px" }}>${totalPrice}</span>
                                            </li>
                                            {form.paymentType !== "0" &&
                                                <li className="d-flex justify-content-between">
                                                    <span >Shipping:</span>
                                                    <span className="h5" style={{ width: "100px" }}>${form.feeShip}</span>
                                                </li>}
                                            <li className="d-flex justify-content-between">
                                                <span >Estimated Delivery</span>
                                                <span className="h5" style={{ width: "100px" }}>{form.estimatedDate === null ? "..." : form.estimatedDate}</span>
                                            </li>
                                            <li className="d-flex justify-content-between">
                                                <span >VAT:</span>
                                                <span className="h5" style={{ width: "100px" }}>{dataNumber.value}%</span>
                                            </li>
                                            <li className="d-flex justify-content-between">
                                                <span>Total:</span>
                                                <span className="h5" style={{ width: "100px", textDecorationLine: form.voucher !== "0" && "line-through" }}>${Math.round((Number(totalPrice) + Number(form.feeShip) + Number(totalPrice) * (Number(dataNumber.value)/100)) * 100) / 100}</span>
                                            </li>
                                            {form.voucher !== "0" && <li className="d-flex justify-content-between">
                                                <span></span>
                                                <span className="h5" style={{ width: "100px" }}>${Math.round((Number(totalPrice) + Number(form.feeShip) + Number(totalPrice) * 0.1 - totalPrice * Number(form.voucher)) * 100) / 100}</span>
                                            </li>}
                                        </ul>
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
                                                            <div className="row">
                                                                <div className="col">
                                                                    <Select
                                                                        name="city"
                                                                        title="City"
                                                                        // label={form.city}
                                                                        value={formAddress.city}
                                                                        options={city}
                                                                        onChangeFunc={onSelectChange}
                                                                        {...errorInput.city}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <Select
                                                                        name="district"
                                                                        title="District"
                                                                        value={formAddress.district}
                                                                        options={district}
                                                                        onChangeFunc={onSelectChange}
                                                                        {...errorInput.district}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <Select
                                                                        name="ward"
                                                                        title="Ward"
                                                                        value={formAddress.ward}
                                                                        options={ward}
                                                                        onChangeFunc={onSelectChange}
                                                                        {...errorInput.ward}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <Input
                                                                name="numberDetail"
                                                                title="Detail Arderss"
                                                                value={form.numberDetail}
                                                                onChangeFunc={onInputChange}
                                                                {...errorInput.numberDetail}
                                                            />
                                                            <Input
                                                                name="address"
                                                                title="Address"
                                                                value={form.address}
                                                                // onChangeFunc={onInputChange}
                                                                // {...errorInput.address}
                                                                disabled="disabled"
                                                                style={{ backgroundColor: "gray" }}
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
                                                            {/* <button className="button-1" onClick={getOTP}>Get OTP</button> */}
                                                            <label className="form-label">Payment Type</label>
                                                            <div class="card-body">
                                                                {paymentList.map(item => (
                                                                    <label class="checkbox-btn mr-1">
                                                                        <input type="radio" className="hide" name="myfilter_radio" value={item.value} onChange={(e) => setForm(prev => ({ ...prev, paymentType: e.target.value }))} />
                                                                        <span class={form.paymentType === item.value ? "btn btn-light active" : "btn btn-light"}>{item.label}</span>
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

                                                {form.paymentType === "1" ?
                                                    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                                                        <PayPalButtons
                                                            style={{ layout: "horizontal" }}
                                                            onClick={onClick}
                                                            createOrder={createOrders}
                                                            onApprove={onApprove}
                                                            forceReRender={[form.voucher, form.feeShip, form.city, form.district, form.ward, form.numberDetail]}
                                                        />
                                                    </PayPalScriptProvider> :
                                                    <button
                                                        onClick={() => setSuccessPayPal(true)}
                                                        className="button-1" style={{ width: "300px" }}
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
            </div>
        </>
    )
}
export default Checkout;