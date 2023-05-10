import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileByUser, getUserDetails} from '../redux/actions/UserAction'
import { updateAccountByUser} from '../redux/actions/AccountAction'
import {
    USER_UPDATE_PROFILE_RESET,
    ACCOUNT_UPDATE_RESET,
} from '../redux/constants/Constants'

import Loading from '../components/loadingError/Loading';
import Message from "../components/loadingError/Message";
import Input from '../components/checkValidate/Input';
import Radio from '../components/checkValidate/Radio'
const genderList = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ];

const ProfileScreen = () => {
    const [formChangePassword, setFormChangePassword] = useState({
        newPassword: "",
        currentPassword: "",
    })
    const [hide, setHide] = useState(false);
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        username: '',
    })
    const [formCheck, setFormCheck] = useState({
        name: '',
        age: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        username: '',
    })
    const [change, setChange] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const id = userInfo.id;

    const dispatch = useDispatch();

    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, user} = userDetail;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if (successUpdateAccount) {
            dispatch({type: ACCOUNT_UPDATE_RESET});
        }
        if (user&&user.id!==id) {
            dispatch(getUserDetails(id));
        } else {
            setForm({
                name: user.name,
                age: user.age,
                gender: user.gender?user.gender:'Male',
                address: user.address,
                phone: user.phone,
                email: user.email,
                username: user.account.username,
            });
        }
        if(hide){
            setFormChangePassword({});
        }
    }, [user, dispatch, id, successUpdate, hide]);
    
    const onInputValidate = (value, name) => {
        setErrorInputProfile(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
        setErrorInput(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
    }
    const [errorInputProfile, setErrorInputProfile] = useState({
        name: {
            isReq: true,
            reqType: 'NAME',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        age: {
            isReq: true,
            reqType: 'AGE',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        gender: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        phone: {
            isReq: true,
            reqType: 'PHONE',
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
        },
    });

    //Change Password
    const accountUpdate = useSelector((state) => state.accountUpdate);
    const {
        loading: loadingUpdateAccount,
        error: errorUpdateAccount,
        success: successUpdateAccount,
    } = accountUpdate;
         
    const [errorInput, setErrorInput] = useState({
        currentPassword: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        newPassword: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
    });
         
    const onInputChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        setFormChangePassword(prev => ({
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
            } else if (errObj.isReq && ! formChangePassword[x]) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const validateFormProfile = () => {
        let isInvalid = false;
        Object.keys(errorInputProfile).forEach(x => {
            const errObj = errorInputProfile[x];
            if (errObj.errorMsg) {
                isInvalid = true;
            } else if (errObj.isReq && ! form[x]) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const handleSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(updateAccountByUser({formChangePassword}));
        }
    };

    const submitHandler = () => {
        const isValid = validateFormProfile();
        if (isValid) {
            dispatch(updateUserProfileByUser({form}));
        }

        //dispatch(updateUserProfileByUser({userprofile}));
    };

    
  return (
      <div className="container rounded">
        <div className="row py-4">
            <div className="col-md-4">
                <div className="d-flex flex-column align-items-center text-center p-3">
                    <img className="rounded-circle mt-4" src="https://i.imgur.com/0eg0aG0.jpg" width="90"/>
                    <span className="font-weight-bold">{form.username}</span>
                    <span className="text-black-50">{form.email}</span>
                    <span>{form.address}</span></div>
                    <article class="filter-group">
                        <header class="card-header" style={{border: "none"}}>
                            <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="false" class="d-flex collapsed">
                                <i class="icon-control fa fa-chevron-down mr-3">
                                </i>
                                <h5 class="title1">Change Password </h5>
                            </a>
                        </header>
                    {/* <button className="btn btn-primary btn-block" type="submit" onClick={()=>setHide(!hide)}>Change Password</button> */}
                        {/* { hide ? ( */}
                        
                        <div class="filter-content collapse form mb-5 py-2" id="collapse_3">
                            <div className="login-form">
                                        <Input
                                            name="currentPassword"
                                            title="Current Password"
                                            type="password"
                                            id="login"
                                            value={formChangePassword.currentPassword}
                                            onChangeFunc={onInputChange}
                                            {...errorInput.currentPassword}
                                        />
                                        <Input
                                            name="newPassword"
                                            title="New Password"
                                            type="password"
                                            value={formChangePassword.newPassword}
                                            onChangeFunc={onInputChange}
                                            {...errorInput.newPassword}
                                        />
                                </div>
                    
                        
                        {/* {loadingUpdateAccount ? (
                            <Loading />
                                ) : (errorUpdateAccount) ? (
                                    <div className="button-1">
                                        <Message variant="alert-danger">{errorUpdateAccount}</Message>
                                        <button className="btn btn-success btn-block" onClick={handleSubmit}>Save Changes</button>
                                    
                                    </div>
                                ) : (
                        <div className="col text-center px-xl-3">
                            <button className="button-1" onClick={handleSubmit}>Save Changes</button>
                        </div>)} */}
                        <div className="text-center pt-1 mb-3 pb-1">
                                <button className="button-1" style={{width: "150.9px"}} onClick={loadingUpdateAccount?"disabled":handleSubmit}>
                                    {loadingUpdateAccount?<Loading a={"16px"}/>:
                                    "Save Changes"}
                                </button>
                            </div>
                        {errorUpdateAccount && (<Message variant="alert-danger">{errorUpdateAccount}</Message>)}

                    </div>
                    {/* ):(<></>)} */}
                   </article> 
            </div>
            <div className="col-md-8">
                    <div className="text-center">
                        {/* <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                            <h6>Back to home</h6>
                        </div> */}
                        <h4>Edit Profile</h4>
                        
                        </div>
                    { (loading) ? (
                        <Loading />
                            ) : (error) ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                        <div className="form m-3">
                        <div className="row">
                            <div className="col">
                                    <div className="col">
                                            <Input
                                                name="name"
                                                title="Name"
                                                value={form.name}
                                                onChangeFunc={onInputChange}
                                                {...errorInputProfile.name}
                                                />
                                            <div className="row">
                                                    <div className="col">
                                                    <Input
                                                        name="age"
                                                        title="Age"
                                                        value={form.age}
                                                        onChangeFunc={onInputChange}
                                                        {...errorInputProfile.age}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <Radio
                                                            name="gender"
                                                            title="Gender"
                                                            value={form.gender}
                                                            options={genderList}
                                                            onChangeFunc={onInputChange}
                                                            {...errorInputProfile.gender}
                                                        />
                                                    </div>
                                                </div>
                                                <Input
                                                    name="phone"
                                                    title="Phone Number"
                                                    value={form.phone}
                                                    onChangeFunc={onInputChange}
                                                    {...errorInputProfile.phone}
                                                />
                                                <Input
                                                    name="email"
                                                    title="Email"
                                                    value={form.email}
                                                    onChangeFunc={onInputChange}
                                                    {...errorInputProfile.email}
                                                />
                                                <Input
                                                    name="address"
                                                    title="Address"
                                                    value={form.address}
                                                    onChangeFunc={onInputChange}
                                                    {...errorInputProfile.address}
                                                />
                                    </div>
                                </div> 
                        </div>
                        <div className="text-center pt-1 mb-3 pb-1">
                                    <button className="button-1" style={{width: "150.9px"}} onClick={loadingUpdate?"disabled":submitHandler}>
                                        {loadingUpdate?<Loading a={"16px"}/>:
                                        "Save Changes"}
                                    </button>
                                </div>
                                {errorUpdate && (<Message variant="alert-danger">{errorUpdate}</Message>)}
                        {/* <div className="col text-center px-xl-3" style={{padding: "0 0 10 0"}}>
                            <button className="button-1" type="submit" onClick={submitHandler}>Save Changes</button>
                        </div> */}
                    </div>
                    )}
                </div>
            </div>
        </div>
    
  )
}

export default ProfileScreen
