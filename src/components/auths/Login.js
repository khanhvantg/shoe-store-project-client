import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../redux/actions/AuthAction";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import Input from '../checkValidate/Input';
const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
      });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

     
    const onInputValidate = (value, name) => {
    setErrorInput(prev => ({
        ...prev,
        [name]: { ...prev[name], errorMsg: value }
    }));
    }
     
    const [errorInput, setErrorInput] = useState({
        username: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        password: {
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
     
    const handleSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(login({form}));
        }
    }
    
    return (
        <div className="login-container gradient-custom">
            <div class="account section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="login-form border p-5 bg-white">
                                <div class="text-center heading">
                                    <h2 class="mb-2">Login</h2>
                                    <p class="lead">Don’t have an account? <Link to={{ pathname: "/signup" }} style={{color: "blue"}}>Create a free account</Link></p>
                                </div>
                                <div className="form">
                                    <Input
                                        name="username"
                                        title="Username"
                                        value={form.username}
                                        onChangeFunc={onInputChange}
                                        {...errorInput.username}
                                        />
                                    
                                    <Input
                                        name="password"
                                        title="Password"
                                        type="password"
                                        value={form.password}
                                        onChangeFunc={onInputChange}
                                        {...errorInput.password}
                                        
                                    />
                                    {/* <span>
                                    
                                    <i className="fa fa-eye" aria-hidden="true" style={{position: "absolute",
                                            right: 5,
                                            top: 10,
                                            cursor: "pointer"}}></i>
                                </span> */}
                                    <div className="text-center pt-1 mb-3 pb-1">
                                            <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" onClick={handleSubmit}>Login</button>
                                        </div>
                                    {loading ? (
                                        <Loading />
                                        ) : error ? (
                                            <Message variant="alert-danger">Username Or Password is not correct</Message>
                                        ) : (
                                            <></>
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
export default Login