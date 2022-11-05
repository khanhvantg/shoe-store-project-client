import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { register } from "../../redux/actions/AuthAction";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import {
    USER_REGISTER_RESET
} from '../../redux/constants/Constants'
import checkInput from '../checkInput/checkInput';
const SignUp = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const role = ["user"];
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, SetErr] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    const {checkEmpty} = checkInput();
    useEffect(() => {
        if (userInfo) {
            navigate("/profile");
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        //const inputList = [username, password, confirmPassword];
        const inputList = ["username", "password", "confirmPassword"];
        
        //console.log(JSON.parse(inputList))
        checkEmpty(inputList);
        
        if (password !== confirmPassword) {
            dispatch({type: USER_REGISTER_RESET})
        } else {
            SetErr("");
            dispatch(register(username, password, role));
        }
    };

    return (
        <div className="signUp-container gradient-custom">
            <div class="account section">
                <div class="container">
                <div class="row justify-content-center ">
                    <div class="col-lg-6">
                    <div class="login-form border p-5 bg-white">
                        <div class="text-center heading">
                        <h2 class="mb-2">Sign Up</h2>
                        <p class="lead">Already have an account? <Link to="/login"> Login now</Link></p>
                        </div>
                        <form>
                            <div class="form-group mb-4">
                                <label for="#">Enter username</label>
                                <input
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text" class="form-control" placeholder="Enter Password"/> 
                            </div>
                            <div class="form-group mb-4">
                                <label for="#">Enter Password</label>
                                <input
                                    value={password}    
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" class="form-control" placeholder="Enter Password"/> 
                            </div>
                            <div class="form-group">
                                <label for="#">Confirm Password</label>
                                <input 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password" class="form-control" placeholder="Confirm Password" /> 
                            </div>
                            {loading ? (
                                        <Loading />
                                            ) : error || err ? (
                                            <div>
                                                <Message variant="alert-danger">{error || err}</Message>
                                                <button onClick={submitHandler} class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Signup</button>
                                            </div>
                                            ) : (
                                            <button onClick={submitHandler} class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Signup</button>
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

export default SignUp