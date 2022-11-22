import React, { useState, useEffect, useCallback } from "react";
import '../Modal.scss'

import { useDispatch, useSelector } from "react-redux";
import { updateAccountByAdmin, getAccountById, getAllAccounts} from '../../../redux/actions/AccountAction'
import {
    ACCOUNT_UPDATE_RESET,
} from '../../../redux/constants/Constants'

import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";

import Input from '../../checkValidate/Input';
import Checkbox from '../../checkValidate/Checkbox';
import Radio from "../../checkValidate/Radio";

const roleList = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "mod", label: "Moderator" }
  ];
  const statusList = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ];
const AccountUpdate = ({isShowing, hide, id}) => {
    const [form, setForm] = useState({
        accountId: id,
        username: '',
        password: '',
        status: null,
        role: [],
        modifiedBy: '',
        modifiedDate: '',
      });
    const [open,setOpen]=useState(false);
    var today = new Date();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const accountDetail = useSelector((state) => state.accountDetail);
    const { loading, error, account} = accountDetail;

    const accountUpdate = useSelector((state) => state.accountUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = accountUpdate;

    useEffect(() => {
        setForm({});
        if (successUpdate) {
            dispatch({type: ACCOUNT_UPDATE_RESET});
            dispatch(getAllAccounts());
        } else {
            if (isShowing&&account.id!==id) {
                dispatch(getAccountById(id));
            }else if (isShowing){
                const str=[];
                for (let i in account.roles) {
                    if(account.roles[i].name==="ROLE_ADMIN")
                        str.push('admin')
                    else if(account.roles[i].name==="ROLE_MODERATOR")
                        str.push('mod')
                    else str.push('user')
                }
                setForm(prev => ({
                    ...prev,
                    accountId: id,
                    username: account.username,
                    status: account.status ? account.status : "1",
                    role: str,
                    modifiedBy: userInfo.username,
                    modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
                }))
            }
        }
    }, [account, dispatch, id, successUpdate, hide]);

    const onInputValidate = (value, name) => {
        setErrorInput(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
        }
         
    const [errorInput, setErrorInput] = useState({
        status: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        password: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        role: {
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
            } else if (errObj.isReq && (Array.isArray(form[x]) ? !form[x].length : !form[x])) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const submitHandler = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(updateAccountByAdmin({form}));
        }
    };

    if(!isShowing&&!open) return null;
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
                                <div className="form">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label>Id</label>
                                                <input 
                                                    value={id}
                                                    className="form-control" type="text" name="accountId" disabled/>
                                            </div>
                                            <div className="form-group">
                                                <label>Modified By</label>
                                                <input 
                                                    value={form.modifiedBy}
                                                    className="form-control" type="text" name="username" disabled/>
                                            </div>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input 
                                                    value={form.username}
                                                    className="form-control" type="text" name="username" disabled/>
                                            </div>
                                            <Input
                                                name="password"
                                                title="Password"
                                                type="password"
                                                value={form.password}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.password}
                                            />
                                            <Radio
                                                name="status"
                                                title="Status"
                                                value={form.status}
                                                options={statusList}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.status}
                                            />
                                            <Checkbox
                                                name="role"
                                                title="Role"
                                                value={form.role}
                                                options={roleList}
                                                onChangeFunc={onInputChange}
                                                {...errorInput.role}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-end">
                                            <button className="btn btn-primary" type="submit" onClick={submitHandler}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountUpdate
