import React, { useState, useEffect } from 'react'
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
            navigate("/");
        }
    }, [userInfo, navigate]);


    const handleChange = (e) => {
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
                                            onChange={handleChange}
                                            //onChange={(e) => setUsername(e.target.value)} 
                                            type="username" class="form-control" placeholder="Enter Username" />
                                    </div>
                                    <div class="form-group">
                                        <label for="#">Enter Password</label>
                                        <input 
                                            value={formValues.password}
                                            name="password"
                                            onChange={handleChange}
                                            //onChange={(e) => setPassword(e.target.value)} 
                                            type="password" class="form-control" placeholder="Enter Password" /> 
                                    </div>
                                    {loading ? (
                                        <Loading />
                                            ) : error ? (
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                
                                                
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" onClick={submitHandler}>Login</button>
                                                <Message variant="alert-danger">Username Or Password is not correct</Message>
                                            </div>
                                            ) : (
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    
                                                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" 
                                                        type="button" 
                                                        onClick={submitHandler}>Login</button>
                                                        <div style={{visibility: "hidden"}}>
                                                    <Message variant="alert-danger">0</Message>
                                                    </div>
                                                </div>
                                            
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