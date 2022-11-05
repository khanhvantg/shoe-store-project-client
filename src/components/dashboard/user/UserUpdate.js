import React, { useState, useEffect } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileByAdmin, getUserDetails, getAllUsers} from '../../../redux/actions/UserAction'
import {
    USER_UPDATE_PROFILE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
const UserUpdate = ({isShowing, hide, id}) => {
    //const [accountId,setAccountId] = useState({id});

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    //const {modifiedBy} = localStorage.getItem("userInfo").username;
    var today = new Date();

    // const {modifiedDate} = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const {modifiedBy,setModifiedBy} = useState(localStorage.getItem("userInfo").username);
    const {modifiedDate,setModifiedDate} =useState(today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
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
        if (successUpdate) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(getAllUsers());
        } else {
            if (isShowing&&user.id!==id) {
                dispatch(getUserDetails(id));
            }else if (isShowing){
                setName(user.name);
                setAge(user.age);
                setGender(user.gender);
                setPhone(user.phone);
                setAddress(user.address);
                setEmail(user.email);
                setType(user.type);
                setStatus(user.status);
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
        email,
        type,
        status
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfileByAdmin({userprofile}));
    };

    if(!isShowing) return null;
    return (
        <>
            <div className="modal-overlay"/>
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} txtrole="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Account</h5>
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
                                <form className="form" novalidate="">
                                    <div className="row">
                                        <div className="col">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Id</label>
                                                        <input 
                                                            value={id}
                                                            className="form-control" type="text" name="accountId" disabled/>
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
                                                        <label>Address</label>
                                                        <input 
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            className="form-control" type="text" name="address" placeholder/>
                                                        <label>Email</label>
                                                        <input 
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="form-control" type="text" name="email" placeholder/>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Type</label>
                                                                    <input 
                                                                        value={type}
                                                                        onChange={(e) => setType(e.target.value)}
                                                                        className="form-control" type="text" name="type" placeholder/>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Status</label>
                                                                    <input 
                                                                    value={status}
                                                                    onChange={(e) => setStatus(e.target.value)}
                                                                    className="form-control" type="text" name="status" placeholder/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
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
                                </form>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserUpdate
