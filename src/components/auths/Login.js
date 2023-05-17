import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login, stopLogin } from "../../redux/actions/AuthAction";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import Input from '../checkValidate/Input';
import { getUserDetails } from '../../redux/actions/UserAction';
import { RESET_LOGIN } from '../../redux/constants/Constants';
const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
      });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const userDetail = useSelector((state) => state.userDetail);
    const { user } = userDetail;
    useEffect(() => {
        // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        if (userInfo) {
            if(userInfo.roles[0]==="ROLE_ADMIN" || userInfo.roles[0]==="ROLE_MODERATOR" || userInfo.roles[1]==="ROLE_ADMIN" || userInfo.roles[1]==="ROLE_MODERATOR"){
                navigate("/manage/paypal");
            } else {
                if(userInfo.name===null){
                    navigate("/profile");
                } else if(navigate(-1)!==navigate("/manage/paypal")){
                    navigate(-1);
                } else navigate("/");
            }
            // if(userInfo.name===null){
            //     navigate("/profile");
            // }
            // else navigate("/");
        }
    }, [dispatch, userInfo, navigate]);

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
            <div className="account section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="login-form border p-5 bg-white">
                                <div className="text-center">
                                    <h2 className="mb-2">Login</h2>
                                    <p className="lead">Don’t have an account? <Link to={{ pathname: "/signup" }} style={{color: "blue"}}>Create a free account</Link></p>
                                </div>
                                <div className="form">
                                    <Input
                                        name="username"
                                        title="Username"
                                        id="login"
                                        value={form.username}
                                        onChangeFunc={onInputChange}
                                        {...errorInput.username}
                                        />
                                    
                                    <Input
                                        name="password"
                                        title="Password"
                                        type="password"
                                        id="login"
                                        value={form.password}
                                        onChangeFunc={onInputChange}
                                        {...errorInput.password}
                                    />
                                    <Link to={{ pathname: "/forgetPassword" }} style={{color: "blue", marginTop: '-10px'}}>Forget Password ?</Link>
                                    <div className="text-center pt-1 mb-3 pb-1">
                                            <button className="button-63 w-100" onClick={loading?"disabled":handleSubmit}>
                                                {loading?<Loading a={"24px"}/>:
                                                "Login"}
                                            </button>
                                        </div>
                                    {error && (<Message variant="alert-danger">Username or Password is not correct</Message>)}
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