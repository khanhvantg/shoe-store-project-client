import React, { useState, useEffect } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { updateAccountByAdmin, getAccountById, getAllAccounts} from '../../../redux/actions/AccountAction'
import {
    ACCOUNT_UPDATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
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
        } else {
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
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Id</label>
                                                        <input 
                                                            value={id}
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
                                                        <input 
                                                            value={role}
                                                            onChange={(e) => setRole(e.target.value)}
                                                            className="form-control" type="text" name="txtrole" placeholder/>
                                                    </div>
                                                </div>
                                            </div>
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
