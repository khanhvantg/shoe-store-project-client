import React, { useState, useEffect } from "react";
import './Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { updateAccountByAdmin, getAccountById, getAllAccounts} from '../../redux/actions/AccountAction'
import {
    ACCOUNT_UPDATE_RESET, ACCOUNT_UPDATE_SUCCESS
} from '../../redux/constants/Constants'

import Loading from '../../components/loadingError/Loading';
import Message from "../../components/loadingError/Message";
const AccountUpdate = ({isShowing, hide, id}) => {
    //const [accountId,setAccountId] = useState({id});

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const [txtrole, setRole] = useState("");

    //const {modifiedBy} = localStorage.getItem("userInfo").username;
    var today = new Date();

    // const {modifiedDate} = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const {modifiedBy,setModifiedBy} = useState(localStorage.getItem("userInfo").username);
    const {modifiedDate,setModifiedDate} =useState(today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    const dispatch = useDispatch();

    const accountDetail = useSelector((state) => state.accountDetail);
    const { loading, error, account} = accountDetail;

    const accountUpdate = useSelector((state) => state.accountUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = accountUpdate;
    useEffect(() => {
        if (successUpdate) {
            dispatch({type: ACCOUNT_UPDATE_RESET});
            dispatch(getAllAccounts());
            // toast.success("Product Updated", ToastObjects);
        } else {
            //dispatch(getAccountById({id}));
            if (isShowing&&account.id!==id) {
                dispatch(getAccountById(id));
            }else if (isShowing){
                setPassword("123456");
                setUsername(account.username);
                setStatus(account.status);
                const str=[];
                for (let i in account.roles) {
                    if(account.roles[i].name==="ROLE_ADMIN")
                        str.push('admin')
                    else if(account.roles[i].name==="ROLE_MODERATOR")
                        str.push('mod')
                    else str.push('user')
                } 
                setRole(str.join())
                console.log(account)
            }
        }
    }, [account, dispatch, id, successUpdate]);
    
    var role = txtrole.split(",")
    const accounts = {
        accountId: id,
        password,
        status,
        role
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateAccountByAdmin({accounts}));
        dispatch(getAllAccounts());
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
                                        <div className="">
                                            {/* <div className="col">
                                                <div className="form-group">
                                                    <label>Full Name</label>
                                                    <input className="form-control" type="text" name="name" placeholder="John Smith" />
                                                </div>
                                            </div> */}
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Id</label>
                                                    <input 
                                                        value={id}
                                                        //onChange={(e) => setAccountId(e.target.value)}
                                                        className="form-control" type="text" name="accountId" disabled/>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Username</label>
                                                    <input 
                                                        value={username}
                                                    
                                                        className="form-control" type="text" name="password" disabled/>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input 
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="form-control" type="text" name="password" placeholder/>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Status</label>
                                                    <input 
                                                        value={status}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        className="form-control" type="text" name="status" placeholder/>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Roles</label>
                                                    {/* <form>
                                                        <div className="fix1">
                                                            <input type="checkbox" value="1" onChange={(e) => setStatus(e.target.value)} name="gender" /> Male
                                                            <input type="checkbox" value="0" onChange={(e) => setStatus(e.target.value)} name="gender" /> Female
                                                        </div>
                                                    </form> */}
                                                    <input 
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        className="form-control" type="text" name="txtrole" placeholder/>
                                                    {/* <input 
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        className="form-control" type="checkbox" name="txtrole" placeholder/>
                                                    <input 
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        className="form-control" type="checkbox" name="txtrole" placeholder/>
                                                    <input 
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        className="form-control" type="checkbox" name="txtrole" placeholder/> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input className="form-control" type="text" placeholder="user@example.com" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col mb-3">
                                                <div className="form-group">
                                                    <label>About</label>
                                                    <textarea className="form-control" rows="5" placeholder="My Bio"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 mb-3">
                                    <div className="mb-2"><b>Change Password</b></div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Current Password</label>
                                                <input className="form-control" type="password" placeholder="••••••" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label>New Password</label>
                                                <input className="form-control" type="password" placeholder="••••••" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                                                    <input className="form-control" type="password" placeholder="••••••" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                                    <div className="mb-2"><b>Keeping in Touch</b></div>
                                    <div className="row">
                                    <div className="col">
                                        <label>Email Notifications</label>
                                        <div className="custom-controls-stacked px-2">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="notifications-blog" checked="" />
                                            <label className="custom-control-label" for="notifications-blog">Blog posts</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="notifications-news" checked="" />
                                            <label className="custom-control-label" for="notifications-news">Newsletter</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="notifications-offers" checked="" />
                                            <label className="custom-control-label" for="notifications-offers">Personal Offers</label>
                                        </div>
                                        </div>
                                    </div>
                                    </div>*/}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col d-flex justify-content-end">
                                    <button className="btn btn-primary" type="submit" onClick={submitHandler}>Save Changes</button>
                                </div>
                            </div>
                        </form>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default AccountUpdate
