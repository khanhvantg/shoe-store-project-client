import React, { useState, useEffect, useCallback } from "react";
import '../Modal.css';
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProductById, getAllProducts} from '../../../redux/actions/ProductAction'
import { getAllcategories, getCategoryById, stopGetCategory } from '../../../redux/actions/CategoryAction'
import {
    PRODUCT_UPDATE_RESET,
    PRODUCT_DETAILS_STOP,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";

import Input from '../../checkValidate/Input'
import Radio from '../../checkValidate/Radio'
const statusList = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ];
const ProductUpdate = ({isShowing, hide, id, idCategory, name}) => {
    const [form, setForm] = useState({
        productId: id,
        name: '',
        price: '',
        // amount: '',
        //category: '',
        description: '',
        createdBy: '',
        createdDate: '',
        modifiedBy: '',
        modifiedDate: '',
        status: null
      });

    //const {modifiedBy} = localStorage.getItem("userInfo").username;
    var today = new Date();

    // const {modifiedDate} = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dispatch = useDispatch();
    const dispatchCategory = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetail;
    // const arr1 = product&&product.productInfors;
    // const arr2 = product&&product.images;
    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

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
        price: {
            isReq: true,
            reqType: 'NUMBER',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        description: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        status: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        }
    });
    const [errStatus, setErrStatus]=useState("");
    useEffect(() => {
        setErrStatus("")
        setForm({})
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(getAllProducts());
            dispatchCategory(getCategoryById(idCategory));
            hide();
        } else {
            if (isShowing&&product.id!==id) {
                dispatch(getProductById(id));
            }else if (isShowing){
                setForm(prev => ({
                    ...prev,
                    productId: id,
                    name: product.name,
                    price: product.price,
                    status: product.status,
                    description: product.description,
                    createdBy: product.createBy,
                    createdDate: product.createdDate,
                    modifiedBy: userInfo.username,
                    modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
                }))
            }
        }
        if(!isShowing){
            setErrorInput({
                name: {
                    isReq: true,
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                },
                price: {
                    isReq: true,
                    reqType: 'NUMBER',
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                },
                description: {
                    isReq: true,
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                },
                status: {
                    isReq: true,
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                }
            })
        }
    }, [product, dispatch, id, successUpdate]);
    const onInputChange = useCallback((value, name) => {
        console.log(name, value)
        // setForm(prev => ({
        //     ...prev,
        //     [name]: value
        // }));
        if (name==="status"&&value==="1"){
            if (product.productInfors.length===0||product.images.length===0){
                // setErrorInput(prev => ({
                //     ...prev,
                //     status: { errorMsg: `Please insert size or image of ${product.name} to active` }
                // }));
                setErrStatus(`Please insert size and image of ${product.name} to active`)
            } else {
                setForm(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }, [product]);
        
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

    const submitHandler = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(updateProduct({form}));
            // hide();
        }
    };

    if(!isShowing) return null;
    return (
        <>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update {name}</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-1">
                        {loading ? (
                            <Loading />
                            ) : error ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                            <div className="form" >
                                <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Modifie By</label>
                                                        <input 
                                                            value={form.modifiedBy}
                                                            className="form-control" type="text" name="modifiedBy" disabled/>
                                                </div>   
                                                
                                                <div className="row">
                                                    <div className="col">
                                                    <Input
                                                    name="name"
                                                    title="Name"
                                                    value={form.name}
                                                    onChangeFunc={onInputChange}
                                                    {...errorInput.name}
                                                />
                                                    </div>
                                                    <div className="col">
                                                        <Input
                                                            name="price"
                                                            title="Price"
                                                            value={form.price}
                                                            onChangeFunc={onInputChange}
                                                            {...errorInput.price}
                                                        />   
                                                    </div>
                                                </div>
                                                <Input
                                                    name="description"
                                                    title="Description"
                                                    value={form.description}
                                                    onChangeFunc={onInputChange}
                                                    {...errorInput.description}
                                                />
                                                <Radio
                                                    name="status"
                                                    title="Status"
                                                    value={form.status}
                                                    options={statusList}
                                                    onChangeFunc={onInputChange}
                                                    {...errorInput.status}
                                                />
                                                {errStatus!==""&&<span className="text-danger">{errStatus}</span>}            
                                            </div>
                                    </div>
                                    <div className="text-center pt-1 mb-3 pb-1">
                                        <button className="button-1" style={{width: "150.9px"}} onClick={loadingUpdate?"disabled":()=>{submitHandler()}}>
                                            {loadingUpdate?<Loading a={"16px"}/>:
                                            "Save Changes"}
                                        </button>
                                    </div>
                                {/* <div className="col text-center px-xl-3">
                                    <button className="button-1" type="submit" onClick={()=>{submitHandler();}}>Save Changes</button>
                                </div> */}
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default ProductUpdate
