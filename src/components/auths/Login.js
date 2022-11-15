import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../redux/actions/AuthAction";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import checkInput from '../checkInput/checkInput';
const Login = () => {
    const initialValues = {username: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const {checkEmpty}=checkInput();

    useEffect(() => {
        if (userInfo) {
            navigate("/shop");
        }
    }, [userInfo, navigate]);

    const onValidate = (value, name) => {
        setErrorInput(prev => ({
          ...prev,
          [name]: { ...prev[name], errorMsg: value }
        }));
      }
       
    const [errorIput, setErrorInput] = useState({
        username: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onValidate
        },
        password: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onValidate
        }
    });

    // const onHandleChange = useCallback((value, name) => {
    //     setFormValues(prev => ({
    //       ...prev,
    //       [name]: value
    //     }));
    //   }, []);

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        checkEmpty(initialValues)
        
        dispatch(login({formValues}));
    };
    
    return (
        <div className="login-container gradient-custom">
            <div class="account section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="login-form border p-5 bg-white">
                                <div class="text-center heading">
                                    <h2 class="mb-2">Login</h2>
                                    <p class="lead">Don’t have an account? <Link to="/signup">Create a free account</Link></p>
                                </div>
                    
                                <form action="#">
                                    <div class="form-group mb-4">
                                        <label for="#">Enter username</label>
                                        <input
                                            value={formValues.username}
                                            name="username"
                                            onChange={onHandleChange}
                                            //onChange={(e) => setUsername(e.target.value)} 
                                            type="username" class="form-control" placeholder="Enter Username" 
                                            {...errorIput.username}
                                            />
                                        
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="#">Enter Password</label>
                                        <input 
                                            value={formValues.password}
                                            name="password"
                                            onChange={onHandleChange}
                                            //onChange={(e) => setPassword(e.target.value)} 
                                            type="password" class="form-control" placeholder="Enter Password" 
                                            {...errorIput.password}/> 
                                        
                                    </div>
                                    <div className="text-center pt-1 mb-3 pb-1">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" onClick={submitHandler}>Login</button>
                                            </div>
                                    {loading ? (
                                        <Loading />
                                            ) : error ? (
                                                <Message variant="alert-danger">Username Or Password is not correct</Message>
                                            ) : (
                                                <></>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login