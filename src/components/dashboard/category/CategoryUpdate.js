import React, { useState, useEffect, useCallback } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { updateCategory, getCategoryById, getAllcategories} from '../../../redux/actions/CategoryAction'
import {
    CATEGORY_UPDATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import Input from '../../checkValidate/Input'
import Radio from '../../checkValidate/Radio'

const statusList = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ];
const CategoryUpdate = ({isShowing, hide, id}) => {
    const [form, setForm] = useState({
        categoryId: id,
        name: '',
        description: '',
        createdBy: '',
        createdDate: '',
        modifiedBy: '',
        modifiedDate: '',
        status: null
    });
    

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const categoryDetail = useSelector((state) => state.categoryDetail);
    const { loading, error, category } = categoryDetail;

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate;

    var today = new Date();
    useEffect(() => {
        setForm({})
        if (successUpdate) {
            dispatch({type: CATEGORY_UPDATE_RESET});
            dispatch(getAllcategories());
        } else {
            if (isShowing&&category.id!==id) {
                dispatch(getCategoryById(id));
            }else if (isShowing){
                setForm(prev => ({
                ...prev,
                categoryId: id,
                name: category.name,
                description: category.description,
                status: category.status,
                createdBy: category.createdBy,
                createdDate: category.createdDate,
                modifiedBy: userInfo.username,
                modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
            }))
            }
        }
    }, [category, dispatch, id, successUpdate]);
    
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
            dispatch(updateCategory({form}));
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
                        <h5 className="modal-title">Update Category</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={hide}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-1">
                        {loading ? (
                        <Loading />
                            ) : error ?(
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                                <div className="form">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                                <label>Modified By</label>
                                                <input 
                                                    value={form.modifiedBy}
                                                    className="form-control" type="text" name="modifiedBy" disabled/>                                       
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
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default CategoryUpdate
