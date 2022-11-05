import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileByUser, getUserDetails} from '../redux/actions/UserAction'
import { updateAccountByUser} from '../redux/actions/AccountAction'
import {
    USER_UPDATE_PROFILE_RESET,
    ACCOUNT_UPDATE_RESET,
} from '../redux/constants/Constants'

import Loading from '../components/loadingError/Loading';
import Message from "../components/loadingError/Message";
const ProfileScreen = () => {
    //const [accountId,setAccountId] = useState({id});
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [hide, setHide] = useState(false);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");



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
        if (successUpdateAccount)
        {
            dispatch({type: ACCOUNT_UPDATE_RESET});
        }
        if (successUpdate) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
        } else {
            if (user.id!==id) {
                dispatch(getUserDetails(id));
            }else {
                setName(user.name);
                setAge(user.age);
                setGender(user.gender);
                setPhone(user.phone);
                setAddress(user.address);
                setEmail(user.email);
                setUsername(user.account.username);
            }
        }
    }, [user, dispatch, id, successUpdate]);
    
    const userprofile = {
        userId: id,
        name,
        age,
        gender,
        phone,
        address,
        email
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfileByUser({userprofile}));
    };

    const accountUpdate = useSelector((state) => state.accountUpdate);
    const {
        loading: loadingUpdateAccount,
        error: errorUpdateAccount,
        success: successUpdateAccount,
    } = accountUpdate;
    const submitHandlerChangePassword = (e) => {
        e.preventDefault();
        dispatch(updateAccountByUser({id,currentPassword,newPassword}));
    };
  return (
      <div class="container rounded bg-white mt-5">
        <div class="row">
            <div class="col-md-4 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img class="rounded-circle mt-5" src="https://i.imgur.com/0eg0aG0.jpg" width="90"/>
                    <span class="font-weight-bold">{username}</span>
                    <span class="text-black-50">{email}</span>
                    <span>{address}</span></div>
                    <button className="btn btn-primary btn-block" type="submit" onClick={()=>setHide(!hide)}>Change Password</button>
                        { hide ? (
                        <form className="form" novalidate="">
                        <div className="row">
                            <div className="col">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <input 
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="form-control" type="password" name="currentPassword" placeholder/>
                                            
                                            <label>New Password</label>
                                                <input 
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="form-control" type="password" name="newPassword" placeholder/>
                                        </div>
                                    </div>
                                </div> 
                        </div>
                        
                        {loadingUpdateAccount ? (
                            <Loading />
                                ) : (errorUpdateAccount) ? (
                                    <div className="col text-center px-xl-3">
                                        <Message variant="alert-danger">{errorUpdateAccount}</Message>
                                        <button className="btn btn-success btn-block" type="submit" onClick={submitHandlerChangePassword}>Save Changes</button>
                                    
                                    </div>
                                ) : (
                        <div className="col text-center px-xl-3">
                            <button className="btn btn-success btn-block" type="submit" onClick={submitHandlerChangePassword}>Save Changes</button>
                        </div>)}

                    </form>):(<></>)}
                    
            </div>
            <div class="col-md-8">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        {/* <div class="d-flex flex-row align-items-center back"><i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                            <h6>Back to home</h6>
                        </div> */}
                        <h6 class="text-right">Edit Profile</h6>
                        
                        </div>
                    </div>
                    { (loading || loadingUpdate) ? (
                        <Loading />
                            ) : (error || errorUpdate) ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                        <form className="form" novalidate="">
                        <div className="row">
                            <div className="col">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="form-control" type="text" name="name" placeholder/>
                                            <div className="row">
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label>Age</label>
                                                            <input 
                                                                value={age}
                                                                onChange={(e) => setAge(e.target.value)}
                                                                className="form-control" type="text" name="age" placeholder/>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label>Gender</label>
                                                            <input 
                                                                value={gender}
                                                                onChange={(e) => setGender(e.target.value)}
                                                                className="form-control" type="text" name="gender" placeholder/>
                                                        </div>
                                                    </div>
                                                </div>
                                            <label>Phone</label>
                                                <input 
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="form-control" type="text" name="phone" placeholder/>              
                                            <label>Email</label>
                                                <input 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="form-control" type="text" name="email" placeholder/>
                                            <label>Address</label>
                                                <input 
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className="form-control" type="text" name="addrees" placeholder/>
                                        </div>
                                    </div>
                                </div> 
                        </div>
                        <div className="col text-center px-xl-3">
                            <button className="btn btn-primary btn-block" type="submit" onClick={submitHandler}>Save Changes</button>
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </div>
    
  )
}

export default ProfileScreen
