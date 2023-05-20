import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from '../../../redux/actions/AccountAction'
import Status from '../../status/Status'
import AccountUpdate from "./AccountUpdate";
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Paginations from "../../pagination/Paginations";
import { Link, useNavigate, useParams, useSearchParams  } from "react-router-dom";
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

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get('page'));
    const [searchText, setSearchText] = useState(searchParams.get('search'));
    let LIMIT = 8;
    let NUM_OF_RECORDS = accounts&&accounts.length;
    const onPageChanged = useCallback(
        (event, page) => {
            event.preventDefault();
            let search;
            if (page) {
              search = {
                search: searchText,
                page: page
              }
            } else {
                search = undefined;

            }
            setCurrentPage(page);
            setSearchParams(search, { replace: true });
        },
        [setSearchParams]
      );
    const onSearchTextChanged = useCallback((event) => {
        event.preventDefault();
        let search;
        if (event.target.value!=="") {
            search = {
            search: event.target.value,
            page: 1
            }
        }else {
            search = {
                search: "",
                page: 1
                }
        }
        setSearchText(event.target.value)
        setCurrentPage(1);
        setSearchParams(search, { replace: true });
    },[setSearchParams])
    const excludeColumns = ["username"];
    const filterData =  accounts&&accounts.filter(item => {
        return Object.keys(item).some(key =>
            excludeColumns.includes(key) ? item[key].toString().toLowerCase().includes(searchText.toLowerCase().trim()) : false
        );
    });
    const currentData = (filterData.length>0?filterData:accounts&&accounts).sort((a,b)=>(b.id-a.id)).slice(
        (Number(currentPage) - 1) * LIMIT,
        (Number(currentPage) - 1) * LIMIT + LIMIT
    );
    const ListItem = () => {
        return (
            <tr>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
            </tr>
        ); 
    }

    return (
        // <div className="row flex-lg-nowrap">
        //     <div className="col mb-3">
                <div className="e-panel cardcus" style={{width:"100%"}}>
                    <div className="card-body">
                        <div className="text-center card-title">
                            <h3 className="mr-2">Accounts Manage</h3>
                        </div>
                        <header class="">
                            <form class="pb-3">
                                <div class="input-group">
                                    <input style={{background:"white"}}
                                    type="text" class="form-control" placeholder="Search..." 
                                    value={searchText}
                                    onChange={(e) => {onSearchTextChanged(e)}}
                                    />
                                    <div class="input-group-append">
                                        <button class="btn btn-light" type="button"><i class="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </header>
                        <div className="e-table">
                            <div className="table-responsive table-lg mt-3">
                                <table className="table table-bordered table-hover">
                                    <thead align="center">
                                        <tr>
                                            {/* <th>Id</th> */}
                                            <th>User Name</th>
                                            <th> Roles </th>
                                            <th className="sortable">Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    {loading ? (
                                        <tbody align="center">
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                            <ListItem/>
                                        </tbody>
                                    ) :error ? (
                                        <tfoot align="center">
                                            <tr>
                                            <th colspan="4">
                                            <Message variant="alert-danger">{error}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>
                                    ) : (filterData.length===0&&searchText!=="")?(
                                        <tfoot align="center">
                                            <tr>
                                            <th colspan="8">
                                            <Message variant="alert-danger">Not found account with username is {searchText}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>):(
                                    <tbody align="center">
                                    { currentData && currentData.map((account, index) => (
                                        <tr onClick={()=>{toggle(account.id)}}>
                                            {/* <td className="align-middle">{account.id}</td> */}
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
                                    </tbody>)}
                                </table>
                            </div>
                        </div>
                    </div>
                {/* </div>
            </div> */}
            <Paginations
                totalRecords={filterData.length>0?filterData.length:NUM_OF_RECORDS}
                pageLimit={LIMIT}
                pageNeighbours={2}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            />
            <AccountUpdate 
                isShowing={isShowing}
                hide={toggle}
                id={id}/>
        </div>
    )
}

export default AccountMain
