import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { register, l } from "../../redux/actions/AuthAction";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import Input from '../checkValidate/Input';
import {
    USER_REGISTER_RESET
} from '../../redux/constants/Constants'
import { forgetPassword } from '../../redux/actions/AccountAction';
const ForgetPassword = () => {
    const [form, setForm] = useState({
        userName: "",
        phone: "",
        email: ""
      });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accountUpdate = useSelector((state) => state.accountUpdate);
    const { error, loading, success } = accountUpdate;
    useEffect(() => {
        if (success) {
            navigate("/login");
        }
    }, [success, navigate]);

    const onInputValidate = (value, name) => {
        setErrorInput(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
        }
         
    const [errorInput, setErrorInput] = useState({
        userName: {
            isReq: true,
            reqType: 'USERNAME',
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
        
    const handleSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(forgetPassword({form}));
        }
    }

    return (
        <div className="signUp-container gradient-custom">
            <div className="account section">
                <div className="container">
                <div className="row justify-content-center ">
                    <div className="col-lg-6">
                    <div className="login-form border p-5 bg-white">
                        <div className="text-center">
                        <h2 className="mb-2">Forget Password</h2>
                        {/* <p className="lead">Already have an account? 
                        <Link to="/login" style={{color: "blue"}}> Login now</Link>
                        </p> */}
                         
                        </div>
                        <Link to="/login" style={{color: "blue"}}>Back?</Link>
                        <div className="form">
                            <Input
                                name="userName"
                                title="Username"
                                value={form.userName}
                                onChangeFunc={onInputChange}
                                {...errorInput.userName}
                                />
                            <Input
                                name="phone"
                                title="Phone"
                                value={form.phone}
                                onChangeFunc={onInputChange}
                                {...errorInput.phone}
                            />
                            <Input
                                name="email"
                                title="Email"
                                value={form.email}
                                onChangeFunc={onInputChange}
                                {...errorInput.email}
                            />
                            <div className="form-group">
                                        <button onClick={handleSubmit} className="button-63 w-100">Update Password</button>
                                    </div>
                            {loading ? (
                                <Loading />
                                    ) : error && (
                                        <Message variant="alert-danger">{error}</Message>
                                    
                                )}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword