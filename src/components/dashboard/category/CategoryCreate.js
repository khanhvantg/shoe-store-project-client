import React, { useState, useEffect, useCallback } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { updateCategory, getCategoryById, getAllcategories, creatCategory} from '../../../redux/actions/CategoryAction'
import {
    CATEGORY_CREATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import Input from '../../checkValidate/Input'
import Radio from '../../checkValidate/Radio'

const statusList = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ];
const CategoryCreate = ({isShowing, hide}) => {
    const [form, setForm] = useState({
        name: '',
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

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: succsesCreate,
    } = categoryCreate;
    
    var today = new Date();
    useEffect(() => {
        setForm({});
        if (succsesCreate) {
            dispatch({type: CATEGORY_CREATE_RESET});
            dispatch(getAllcategories());
        }else if(isShowing){
            setForm(prev => ({
                ...prev,
                createdBy: userInfo.username,
                createdDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
            }))
        }
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
            dispatch(creatCategory({form}));
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
                        <h5 className="modal-title">Create Category</h5>
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
                                                            value={form.createdBy}
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
export default CategoryCreate