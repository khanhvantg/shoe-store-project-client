import React, { useState, useEffect, useCallback } from "react";
import '../Modal.css'

import { useDispatch, useSelector } from "react-redux";
import { updateCategory, getCategoryById, getAllcategories, creatCategory} from '../../../redux/actions/CategoryAction'
import {
    VOUCHER_CREATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import Input from '../../checkValidate/Input'
import Radio from '../../checkValidate/Radio'
import { creatVoucher, getAllVouchers } from "../../../redux/actions/VoucherAction";
import LoadingCustom from "../../loadingError/LoadingCustom";

const statusList = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ];
const VoucherCreate = ({isShowing, hide}) => {
    const [form, setForm] = useState({
        name: '',
        value: '',
        quantity: '',
        status: 1
      });
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const voucherCreate = useSelector((state) => state.voucherCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: succsesCreate,
    } = voucherCreate;
    
    var today = new Date();

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
        value: {
            isReq: true,
            reqType: 'NUMBER',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        quantity: {
            isReq: true,
            reqType: 'NUMBER',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        status: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        }
    });

    useEffect(() => {
        setForm({});
        if (succsesCreate) {
            dispatch({type: VOUCHER_CREATE_RESET});
            dispatch(getAllVouchers());
        }else if(isShowing){
            // setForm(prev => ({
            //     ...prev,
            //     createdBy: userInfo.username,
            //     createdDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
            // }))
        }
        if(!isShowing){
            setErrorInput({
                name: {
                    isReq: true,
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                },
                value: {
                    isReq: true,
                    reqType: 'NUMBER',
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                },
                quantity: {
                    isReq: true,
                    reqType: 'NUMBER',
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
    }, [dispatch, succsesCreate, isShowing]);
         
    const onInputChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const onInputValueVoucherChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: Number(value)/100
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

    const submitHandler = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(creatVoucher({form}));
        }
    };
    if(!isShowing) return null;
    return (
        <>
        {
            loadingCreate&&<LoadingCustom content='Creating'/>
        }
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Voucher</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-1">
                            <div className="form">
                                <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Created By</label>
                                                        <input 
                                                            value={userInfo.username}
                                                            className="form-control" type="text" name="createdBy" disabled/>
                                                    </div>
                                                    <Input
                                                        name="name"
                                                        title="Name"
                                                        value={form.name}
                                                        onChangeFunc={onInputChange}
                                                        {...errorInput.name}
                                                    />
                                                    <Input
                                                        name="value"
                                                        title="Value"
                                                        value={form.value}
                                                        onChangeFunc={onInputChange}
                                                        {...errorInput.value}
                                                    />
                                                    <Input
                                                        name="quantity"
                                                        title="Quantity"
                                                        value={form.quantity}
                                                        onChangeFunc={onInputChange}
                                                        {...errorInput.quantity}
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
                                <div className="text-center pt-1 mb-3 pb-1">
                                    <button className="button-1" style={{width: "150.9px"}} onClick={loadingCreate?"disabled":submitHandler}>
                                        {loadingCreate?<Loading a={"16px"}/>:
                                        "Save"}
                                    </button>
                                </div>
                                {/* <div className="col text-center px-xl-3">
                                    <button className="button-1" type="submit" onClick={submitHandler}>Save</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default VoucherCreate
