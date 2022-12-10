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
const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: ""
      });
    const [err, SetErr] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;
    useEffect(() => {
        if (userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate, dispatch]);

    const onInputValidate = (value, name) => {
        setErrorInput(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
        }
         
    const [errorInput, setErrorInput] = useState({
        username: {
            isReq: true,
            reqType: 'USERNAME',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        password: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        confirmPassword: {
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
            if (form.password !== form.confirmPassword) {
                dispatch({type: USER_REGISTER_RESET})
            } else {
                SetErr("");
                dispatch(register({form}));
            }
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
                        <h2 className="mb-2">Sign Up</h2>
                        <p className="lead">Already have an account? <Link to="/login" style={{color: "blue"}}> Login now</Link></p>
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
                            <Input
                                name="confirmPassword"
                                title="Confirm Password"
                                type="password"
                                value={form.confirmPassword}
                                onChangeFunc={onInputChange}
                                {...errorInput.confirmPassword}
                            />
                            <div className="form-group">
                                        <button onClick={handleSubmit} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Signup</button>
                                    </div>
                            {loading ? (
                                <Loading />
                                    ) : error || err ? (
                                        <Message variant="alert-danger">{error || err}</Message>
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

export default SignUp