import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileByAdmin, getUserDetails, getAllUsers} from '../../../redux/actions/UserAction'
import {
    USER_UPDATE_PROFILE_RESET,
} from '../../../redux/constants/Constants'
import '../Modal.scss'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";

import Input from '../../checkValidate/Input';
import Radio from "../../checkValidate/Radio";

const genderList = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ];

  const statusList = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ];

  const typeList = [
    { value: 1, label: "Vip" },
    { value: 0, label: "Normal" }
  ];
const UserUpdate = ({isShowing, hide, id}) => {
    const [form, setForm] = useState({
        userId: id,
        name: '',
        age: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        status: null,
        type: null,
        modifiedBy: '',
        modifiedDate: '',
    })

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, user} = userDetail;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    var today = new Date();
    useEffect(() => {
        setForm({});
        if (successUpdate) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(getAllUsers());
        } else {
            if (isShowing&&user.id!==id) {
                dispatch(getUserDetails(id));
            }else if (isShowing){
                setForm(prev => ({
                    ...prev,
                    userId: id,
                    name: user.name,
                    age: user.age,
                    gender: user.gender ? user.gender : 'Male',
                    address: user.address,
                    phone: user.phone,
                    email: user.email,
                    username: user.account.username,
                    status: user.status ? user.status : "1",
                    type: user.type ? user.type : "0",
                    modifiedBy: userInfo.username,
                    modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(),
                }))
            }
        }
    }, [user, dispatch, id, successUpdate]);


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
        age: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        phone: {
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
        address: {
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
            } else if (errObj.isReq && !form[x] && isShowing) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const submitHandler = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(updateUserProfileByAdmin({form}));
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
                            <h5 className="modal-title">Update User</h5>
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
                                <dive className="form">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label>Id</label>
                                                <input 
                                                    value={id}
                                                    className="form-control" type="text" name="accountId" disabled/>
                                            </div>
                                            <div className="form-group">
                                                <label>Modified By</label>
                                                <input 
                                                    value={form.modifiedBy}
                                                    className="form-control" type="text" name="username" disabled/>
                                            </div>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input 
                                                    value={form.username}
                                                    className="form-control" type="text" name="username" disabled/>
                                            </div>
                                            <Input
                                                name="name"
                                                title="Name"
                                                value={form.name}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.name}
                                            />
                                            <div className="row">
                                                <div className="col">
                                                    <Input
                                                        name="age"
                                                        title="Age"
                                                        value={form.age}
                                                        onChangeFunc={onInputChange}
                                                        {...errorInput.age}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <Radio
                                                        name="gender"
                                                        title="Gender"
                                                        value={form.gender}
                                                        options={genderList}
                                                        onChangeFunc={onInputChange}
                                                        // {...errorInput.gender}
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                name="phone"
                                                title="Phone Number"
                                                value={form.phone}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.phone}
                                            />
                                            <Input
                                                name="email"
                                                title="Email"
                                                type="Email"
                                                value={form.email}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.email}
                                            />
                                            <Input
                                                name="address"
                                                title="Address"
                                                value={form.address}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.address}
                                            />
                                            <div className="row">
                                                <div className="col">
                                                    <Radio
                                                        name="type"
                                                        title="Type"
                                                        value={form.type}
                                                        options={typeList}
                                                        onChangeFunc={onInputChange}
                                                        // {...errorInput.type}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <Radio
                                                        name="status"
                                                        title="Status"
                                                        value={form.status}
                                                        options={statusList}
                                                        onChangeFunc={onInputChange}
                                                        // {...errorInput.status}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col text-center px-xl-3">
                                            <button className="btn btn-primary btn-block" type="submit" onClick={submitHandler}>Save Changes</button>
                                        </div>
                                    {/* <div className="">
                                        <div className="col d-flex justify-content-end">
                                            <button className="btn btn-primary" type="submit" onClick={submitHandler}>Save Changes</button>
                                        </div>
                                    </div> */}
                                </dive>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserUpdate
