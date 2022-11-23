import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from '../../../redux/actions/AccountAction'
import Status from '../../status/Status'
import AccountUpdate from "./AccountUpdate";
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';

const AccountMain = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [checked,setChecked]=useState();
    const {isShowing, toggle, id} = useModal();

    
    const accountList = useSelector((state) => state.accountList);
    const { loading, error, accounts} = accountList;
    
    useEffect(() => {
        dispatch(getAllAccounts());
    }, [dispatch]);

    return (
        // <div className="row flex-lg-nowrap">
        //     <div className="col mb-3">
                <div className="e-panel card">
                    <div className="card-body">
                        <div className="text-center card-title">
                            <h3 className="mr-2">Accounts Manage</h3>
                        </div>
                        <div className="e-table">
                            <div className="table-responsive table-lg mt-3">
                            {loading ? (
                                <Loading />
                            ) : error ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th >User Name</th>
                                            <th> Roles </th>
                                            <th className="sortable">Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { accounts && accounts.sort((a,b)=>(a.id-b.id)).map((account, index) => (
                                        <tr>
                                            <td className="align-middle">{account.id}</td>
                                            <td className="text-nowrap align-middle">{account.username}</td>
                                            <td className="text-nowrap align-middle">
                                            {account.roles && account.roles.map((item,index) => (
                                                <div>
                                                    {item.name==="ROLE_USER" ? <span>User </span> : item.name==="ROLE_MODERATOR" ? <span>Moderator </span> : <span>Admin </span> } 
                                                </div>
                                            ))}
                                            </td>
                                            {account.status ==="0" ? (
                                                <td className="text-nowrap align-middle" style={{color:"red"}}>Inactive</td>
                                            ):(
                                                <td className="align-middle" style={{color:"green"}}>Active</td>
                                            )}
                                            {/* <td className="text-nowrap align-middle">
                                                {account.status ==="1" ? <Status check="checked" /> : <Status check=""/>}
                                            </td> */}
                                            <td className="text-center align-middle">
                                                <div className="btn-group align-top">
                                                    <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(account.id)}}> 
                                                        <i className="tf-ion-edit"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>)}
                            </div>
                        </div>
                    </div>
                {/* </div>
            </div> */}
            <AccountUpdate 
                isShowing={isShowing}
                hide={toggle}
                id={id}/>
        </div>
    )
}

export default AccountMain
