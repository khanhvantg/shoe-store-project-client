import React, { useState, useEffect, useCallback } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, createProductByCategoryId} from '../../../redux/actions/ProductAction'

import {
    PRODUCT_CREATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";

import Input from '../../checkValidate/Input'
import Radio from '../../checkValidate/Radio'
import Select from '../../checkValidate/Select'
import ReactSelect from "react-select";

const ProductCreate = ({isShowing, hide, categories}) => {
    const statusList = [
        { value: 1, label: "Active" },
        { value: 0, label: "Inactive" }
      ];
    const categoryList=[];
    for (let i in categories) {
        const cate = { value: categories[i].id, label: categories[i].name};
        categoryList.push(cate);
    }
    // const categoryList = categories.map(item=>())
    const [form, setForm] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        createdBy: '',
        createdDate: '',
        modifiedBy: '',
        modifiedDate: '',
        status: 1
      });
      
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: succsesCreate,
    } = productCreate;

    var today = new Date();
    useEffect(() => {
        setForm({});
        if (succsesCreate) {
            dispatch({type: PRODUCT_CREATE_RESET});
            dispatch(getAllProducts());
        }else if(isShowing){
            setForm(prev => ({
                ...prev,
                createdBy: userInfo.username,
                createdDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
            }))
        }
        console.log(form.size)
    }, [dispatch, succsesCreate, isShowing]);

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
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        category: {
            isReq: true,
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
            } else if (errObj.isReq && (Array.isArray(form[x]) ? !form[x].length : !form[x]) /*!form[x]*/) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const submitHandler = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(createProductByCategoryId({form}));
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
                        <h5 className="modal-title">Create Product</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-1">
                            <div className="form" novalidate="">
                                <div className="row">
                                    <div className="col">
                                                <div className="form-group mb-4">
                                                    <label className="form-label">Create By</label>
                                                        <input 
                                                            value={form.createdBy}
                                                            className="form-control" type="text" name="createdBy" disabled/>
                                                <div>  
                                                <Select
                                                                    name="category"
                                                                    title="Category"
                                                                    value={form.category}
                                                                    options={categoryList}
                                                                    onChangeFunc={onInputChange}
                                                                    {...errorInput.category}
                                                                />
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
                                                        {/* <div className="form-group mb-4">
                                                            <label>Add Size</label>
                                                                <ReactSelect
                                                               // required={true}
                                                                    placeholder="Select Size"
                                                                    isMulti
                                                                    name="size"
                                                                    value={form.size}
                                                                    options={sizeList}
                                                                    onChange={handleChange}
                                                                    // {...errorInput.category}
                                                                />
                                                                {errSelect&&errSelect=="true" ? <span className="text-danger">Please Select Size</span>:<></>}
                                                            </div> */}
                                                    {/* <div className="row">
                                                            <div className="col">
                                                                <Input
                                                                    name="amount"
                                                                    title="Amount"
                                                                    value={form.amount}
                                                                    onChangeFunc={onInputChange}
                                                                    {...errorInput.amount}
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
                                                        </div> */}
                                                          
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
                                                </div>
                                            </div>
                                        </div> 
                                </div>
                                <div className="col text-center px-xl-3">
                                    <button className="btn btn-primary btn-block" type="submit" onClick={submitHandler}>Save Changes</button>
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
export default ProductCreate