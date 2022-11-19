import React, { useEffect, useState,useCallback } from "react";
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from '../../redux/actions/AccountAction'
import Status from '../../components/status/Status'
import AccountUpdate from "./AccountUpdate";
import Loading from '../../components/loadingError/Loading';
import Message from "../../components/loadingError/Message";
import useModal from './useModal';
import '../Layout.scss'
import { Link, useNavigate, Navigate  } from "react-router-dom";
const AccountsScreen = () => {

    const dispatch = useDispatch();
    const [active, setActive] =useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [checked,setChecked]=useState();
    const {isShowing, toggle, id} = useModal();

    const accountList = useSelector((state) => state.accountList);
    const { loading, error, accounts} = accountList;

    useEffect(() => {
        dispatch(getAllAccounts());
    }, [dispatch]);

    const handle = useCallback(() => {
        if(!active) {
            setActive(true);
        }
        else setActive(false);
    }, [active]);
    return (
        <div class="wrapper1">
                {/* <nav id="sidebar" className={active?"active":""}>
                    <ul class="list-unstyled components">
                        <li className="nav-item"><Link to="/manage/accounts" className="nav-link">Accounts</Link></li>
                        <li className="nav-item"><Link to="/manage/users" className="nav-link">Users</Link></li>
                        <li className="nav-item"><Link to="/manage/categories" className="nav-link" >Categories</Link></li>
                        <li className="nav-item"><Link to="/manage/products" className="nav-link">Products</Link></li>
                        <li className="nav-item"><Link to="/manage/orders" className="nav-link">Orders</Link></li>
                    </ul>
                </nav> */}
                {/* // <nav id="sidebar" className="active">
                //     <ul class="list-unstyled components">
                //         <li className="nav-item"><Link to="/manage/accounts" className="nav-link">Accounts</Link></li>
                //         <li className="nav-item"><Link to="/manage/users" className="nav-link">Users</Link></li>
                //         <li className="nav-item"><Link to="/manage/categories" className="nav-link" >Categories</Link></li>
                //         <li className="nav-item"><Link to="/manage/products" className="nav-link">Products</Link></li>
                //         <li className="nav-item"><Link to="/manage/orders" className="nav-link">Orders</Link></li>
                //     </ul>
                // </nav>ư */}
        <div id="content1">
            <nav class="navbar navbar1-expand-lg navbar1-light bg-light">
                <div class="container-fluid">
                    <button type="button" id="sidebarCollapse" class="btn btn-info" onClick={handle}>
                        <i class="fas fa-align-left"></i>
                        <span>Toggle Sidebar</span>
                    </button>

                </div>
            </nav>
            <div className="e-panel card">
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Accounts Manage</h3>
                    </div>
                        <div className="e-table">
                            <div className="table-responsive table-lg mt-3">
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
                                    { accounts && accounts.map((account, index) => (
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
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    </div>       
    )
}

export default AccountsScreen
