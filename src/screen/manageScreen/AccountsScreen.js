import React, { useEffect, useState } from "react";
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from '../../redux/actions/AccountAction'
import Status from '../../components/status/Status'
import AccountUpdate from "./AccountUpdate";
import Loading from '../../components/loadingError/Loading';
import Message from "../../components/loadingError/Message";
import useModal from './useModal';
const AccountsScreen = () => {

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
        <div className="main_container">
            <div className="container">
                <div className="">
                    <div className="col">
                        <Layout/>
                        <div className="row flex-lg-nowrap">
                                <div className="col mb-3">
                                    <div className="e-panel card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h6 className="mr-2">Accounts</h6>
                                            </div>
                                        {/* <div className="text-center px-xl-3">
                                            <button className="btn btn-success btn-block" type="button" onClick={toggle}>New User</button>
                                            <AccountCreate 
                                                isShowing={isShowing}
                                                hide={toggle}/> 
                                        </div> */}
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
                                                            {/* <th className="align-top">
                                                                <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0">
                                                                    <input type="checkbox" className="custom-control-input" id="all-items" />
                                                                        <label className="custom-control-label" for="all-items"></label>
                                                                    </div>
                                                            </th> */}
                                                            <th>Id</th>
                                                            <th >User Name</th>
                                                            <th> Roles </th>
                                                            <th className="sortable">Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    { accounts && accounts.map((account, index) => (
                                                        <tr>
                                                            <td className="align-middle">
                                                                {/* <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                <input type="checkbox" className="custom-control-input" id="item-1" value={account.id}/>
                                                                <label className="custom-control-label" for="item-1"></label>
                                                                </div> */}
                                                                {account.id}
                                                            </td>
                                                            {/* <td className="align-middle text-center">
                                                                <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                            </td> */}
                                                            <td className="text-nowrap align-middle">{account.username}</td>
                                                            <td className="text-nowrap align-middle">
                                                            {account.roles && account.roles.map((item,index) => (
                                                                <div>
                                                                    {item.name==="ROLE_USER" ? <span>User </span> : item.name==="ROLE_MODERATOR" ? <span>Moderator </span> : <span>Admin </span> } 
                                                                </div>
                                                            ))}
                                                            </td>
                                                            <td className="text-nowrap align-middle">
                                                                {account.status ==="1" ? <Status check="checked" /> : <Status check=""/>}
                                                                {/* <div class="toggle-btn">
                                                                    <input type="checkbox" class="cb-value" />
                                                                    <span class="round-btn"></span>
                                                                </div> */}
                                                            </td>
                                            
                                                            {/* <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i></td> */}
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
                                            <div className="d-flex justify-content-center">
                                                <ul className="pagination mt-3 mb-0">
                                                <li className="disabled page-item"><a href="#" className="page-link">‹</a></li>
                                                <li className="active page-item"><a href="#" className="page-link">1</a></li>
                                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                                <li className="page-item"><a href="#" className="page-link">3</a></li>
                                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                                <li className="page-item"><a href="#" className="page-link">5</a></li>
                                                <li className="page-item"><a href="#" className="page-link">›</a></li>
                                                <li className="page-item"><a href="#" className="page-link">»</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AccountUpdate 
                                isShowing={isShowing}
                                hide={toggle}
                                id={id}/> 
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    
    )
}

export default AccountsScreen
