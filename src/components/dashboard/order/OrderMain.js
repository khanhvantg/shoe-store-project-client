import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts} from '../../../redux/actions/ProductAction'
// import { getAllcategories, getCategoryById, stopGetCategory } from '../../../redux/actions/CategoryAction'
// import { CATEGORY_DETAILS_STOP, CATEGORY_DETAILS_SUCCESS } from '../../../redux/constants/Constants'
import Status from '../../status/Status';
import {
    ORDER_UPDATE_RESET,
} from '../../../redux/constants/Constants'
import Loading from '../../loadingError/Loading';
import Message from "../../loadingError/Message";
import useModal from '../useModal';
import { getAllOrders, updateOrder } from '../../../redux/actions/OrderAction'
import OrderDetail from "./OrderDetail";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Paginations from "../../pagination/Paginations";
import { Link, useNavigate, useParams, useSearchParams  } from "react-router-dom";
const OrderMain = () => {
    const navigate = useNavigate();

    const refreshPage = () => {
    navigate(0);
    }
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get('page'));
    //const [curretntSearch, setCurrentSearch] = useState(searchParams.get('search'));
    let LIMIT = 8;
    const {isShowing, toggle, id} = useModal();
    const dispatch = useDispatch();
    const dispatchUpdate = useDispatch();
    const orderList= useSelector((state) => state.orderList);
    const { loading, error, orders} = orderList;
    let NUM_OF_RECORDS = orders&&orders.length;
    const [status, setStatus]=useState();
    const [orderId, setOderId]=useState();
    const orderUpdate = useSelector((state) => state.orderUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = orderUpdate;

    var today = new Date();
    const [orderInfo, setOrderInfo] = useState({
        orderId: null,
        status: null,
        paymentStatus: null,
        modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
    })
    const [data, setData] = useState(orders&&orders)
    const [searchText, setSearchText] = useState(searchParams.get('search'));
    // if(searchParams.get('search')!==""){
    //     setSearchText(searchParams.get('search'));
    // }
    // filterData(searchParams.get('search'))
    useEffect(()=>{
        if (successUpdate) {
            dispatch({type: ORDER_UPDATE_RESET});
            dispatch(getAllOrders());
        }else{
            dispatch(getAllOrders());
            // if(orderId!=null){
            //     dispatchUpdate(updateOrder({orderInfo}));
            //     setStatus()
            //     setOderId();
            // }
        }
        // if(searchParams.get('search')!==""){
        //     setSearchText(searchParams.get('search'));
        // }
        // if(orders.length>0){
        //     filterData(searchText)
        // }
    }, [successUpdate, dispatch]);
    console.log("D",searchText)
    // if(!error)
    //     orders.sort((a,b)=>(a.id-b.id));
    // }
    // const orderDetail = useSelector((state) => state.orderDetail);
    // const { order } = orderDetail;
    // var today = new Date();
    // const orderInfo = {
    //     orderId,
    //     status,
    //     modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
    // }


    var today = new Date();
    const handleC = (e,idO) => {
        const orderInfo = {
            orderId: idO,
            status: e.target.value,
            paymentStatus: e.target.value==='0'?'1':'0',
            modifiedDate: today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
        }
        dispatch(updateOrder({orderInfo}));
        //console.log(orderInfo)
        // setStatus(e.target.value);
        // setOderId(idO);
    }
    console.log("A",searchParams.get('text'))
    console.log("B",searchParams.get('page'))
    const ListItem = () => {
        return (
            <tr>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
                <td className="text-nowrap align-middle"><Skeleton/></td>
            </tr>
        ); 
    }

    // const onPageChanged = useCallback((event,page) => {
    //     setSearchParams({page: page},{ replace: true })
    // },[setSearchParams]);
    // const [search, setSearch] = useState({
    //     page: undefined,
    //     search: undefined
    // })
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
    const excludeColumns = ["id"];
    const filterDataq = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        const filteredData = []
        if (lowercasedValue === "") {
            return filteredData

        } else {
            //console.log(products)
            filteredData = orders.filter(item => {
            return Object.keys(item).some(key =>
                excludeColumns.includes(key) ? item[key].toString().toLowerCase().includes(lowercasedValue) : false
            );
          });

        //   if(filteredData.length===0){
        //     setCheck(false);
        //   }else(setCheck(true));

            return filteredData
        }
      }
    const filterData =  orders.filter(item => {
    return Object.keys(item).some(key =>
        excludeColumns.includes(key) ? item[key].toString().toLowerCase().includes(searchText.toLowerCase().trim()) : false
    );
    });

    const currentData = (filterData.length>0?filterData:orders).sort((a,b)=>(b.id-a.id)).slice(
        (Number(currentPage) - 1) * LIMIT,
        (Number(currentPage) - 1) * LIMIT + LIMIT
    );
    // const currentDataFilter = data.length>0&&data.slice(
    //     (Number(currentPage) - 1) * LIMIT,
    //     (Number(currentPage) - 1)  * LIMIT + LIMIT
    // );
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
      },
      [setSearchParams])
  return (
    // <div className="row flex-lg-nowrap">
    //     <div className="col mb-3">
            <div className="e-panel cardcus" style={{width:"100%"}}>
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Orders Manage</h3>
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
                                        <th>OrderID</th>
                                        <th>Order Date</th>
                                        {/* <th>Amount Item</th> */}
                                        <th>Delivery Date</th>
                                        <th>Total Price</th>
                                        <th>Payment Type</th>
                                        <th>Payment Status</th>
                                        <th>Status</th>
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
                                    ) : error ? (
                                        <tfoot align="center">
                                            <tr>
                                            <th colspan="8">
                                            <Message variant="alert-danger">{error}</Message>
                                            </th>
                                            </tr>
                                        </tfoot>
                                    ) : (filterData.length===0&&searchText!=="")?(
                                    <tfoot align="center">
                                        <tr>
                                        <th colspan="8">
                                        <Message variant="alert-danger">Not found order with id = {searchText}</Message>
                                        </th>
                                        </tr>
                                    </tfoot>):(
                                <tbody align="center">
                                {currentData&&currentData.map((item, index)  => (
                                    <tr onClick={()=>{toggle(item.id)}}>
                                        <td className="text-nowrap align-middle">{item.id}</td>
                                        <td className="text-nowrap align-middle">{item.createdDate}</td>
                                        {item.status ==='3' ?
                                            <td className="text-nowrap align-middle">
                                                {item.modifiedDate}
                                            </td>
                                            :
                                            <td className="text-nowrap align-middle">
                                            </td>
                                        }
                                        <td className="text-nowrap align-middle">${item.orderPrice!=null?Math.round(item.orderPrice*100)/100:Math.round(item.totalPrice*100)/100}</td>
                                        {/* <td className="text-nowrap align-middle">{item.amountItem}</td> */}
                                        {item.paymentType === null || item.paymentType === "0" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00", borderRadius:"5px", color: "white" , padding: "4px"}}>COD</span>
                                            </td>
                                        ):item.paymentType ==="1" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>PayPal</span>
                                            </td>
                                        ):(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>COD</span>
                                            </td>
                                        )}
                                    
                                        {(item.paymentStatus==="0"||item.paymentStatus===null)&&item.paymentType==="1"&&item.status!=="0" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>Paid</span>
                                            </td>
                                        ):(item.paymentStatus==="1"||item.paymentStatus===null)&&item.paymentType==="1"&&item.status==="0" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"gold",borderRadius:"5px", color: "white" , padding: "4px"}}>Refunding</span>
                                            </td>
                                        ):item.paymentStatus==="2"&&item.paymentType==="1" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"blue",borderRadius:"5px", color: "white" , padding: "4px"}}>Refunded</span>
                                            </td>
                                        ):item.status!=="0"&&item.status!=="3" ?(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"gold",borderRadius:"5px", color: "white" , padding: "4px"}}>Paying</span>
                                            </td>
                                        ):item.status ==="3" ? (
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"#00cf00",borderRadius:"5px", color: "white" , padding: "4px"}}>Paid</span>
                                            </td>
                                        ):(
                                            <td className="text-nowrap align-middle" >
                                                <span className="status" style={{backgroundColor:"", color: "" , padding: "4px"}}>None</span>
                                            </td>
                                        )}
                                        {/* {item.status ==="0" ? (
                                            <td className="text-nowrap align-middle" style={{color:"red"}}>Cancelled</td>
                                        ):item.status ==="1" ?(
                                            <td className="align-middle"  style={{color:"gold"}}>Waiting Confirm</td>
                                        ):item.status ==="2" ?(
                                            <td className="align-middle" style={{color:"blue"}}>Shipping</td>
                                        ):(
                                            <td className="align-middle" style={{color:"green"}}>Completed</td>
                                        )} */}
                                        {item.status ==="0" ? (
                                            <td onClick="disable">
                                                <form className="ordering" style={{width: "155px"}}>
                                                    <select className="orderby form-control" style={{color:"red"}} onChange={(e)=>handleC(e,item.id)} disabled>
                                                        <option className="text-nowrap align-middle" value="0">Cancelled</option>
                                                        <option value="1" style={{color:"gold"}}>Waiting Confirm</option>
                                                        <option value="2" style={{color:"blue"}}>Shipping</option>
                                                        <option value="3" style={{color:"green"}}>Completed</option>
                                                    </select>
                                                    <input type="hidden" name="paged" value="1" />
                                                </form>
                                            </td>
                                        ):item.status ==="1" ?(
                                            <td onClick="disable">
                                                <form className="ordering" style={{width: "155px"}}>
                                                    <select className="orderby form-control" style={{color:"gold"}} onChange={(e)=>handleC(e,item.id)}>
                                                        <option className="text-nowrap align-middle" value="1">Waiting Confirm</option>
                                                        <option value="0" style={{color:"red"}}>Cancel</option>
                                                        <option value="2" style={{color:"blue"}}>Shipping</option>
                                                        <option value="3" style={{color:"green"}}>Completed</option>
                                                    </select>
                                                    <input type="hidden" name="paged" value="1" />
                                                </form>
                                            </td>
                                        ):item.status ==="2" ?(
                                            <td onClick="disable">
                                                <form className="ordering" style={{width: "155px"}}>
                                                    <select className="orderby form-control" style={{color:"blue"}} onChange={(e)=>handleC(e,item.id)}>
                                                        <option className="text-nowrap align-middle" value="2">Shipping</option>
                                                        {/* <option value="1" style={{color:"gold"}}>Waiting Confirm</option> */}
                                                        <option value="3" style={{color:"green"}}>Completed</option>
                                                        <option value="0" style={{color:"red"}}>Cancel</option>
                                                    </select>
                                                    <input type="hidden" name="paged" value="1" />
                                                </form>
                                            </td>
                                        ):(
                                            <td onClick="disable">
                                                <form className="ordering" style={{width: "155px"}}>
                                                    <select className="orderby form-control" style={{color:"green"}} onChange={(e)=>handleC(e,item.id)} disabled>
                                                        <option className="text-nowrap align-middle" value="3">Completed</option>
                                                        <option value="1" style={{color:"gold"}}>Waiting Confirm</option>
                                                        <option value="2" style={{color:"blue"}}>Shipping</option>
                                                        <option value="0" style={{color:"red"}}>Cancel</option>
                                                    </select>
                                                    <input type="hidden" name="paged" value="1" />
                                                </form>
                                            </td>
                                        )}

                                        <td className="text-center align-middle">
                                            <div className="btn-group align-top">
                                                {/* <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={""}> 
                                                    <i className="tf-ion-edit"></i>
                                                </button> */}
                                                <button className="btn btn-sm btn-outline-secondary badge" type="button" onClick={()=>{toggle(item.id)}}> 
                                                    <i className="tf-ion-eye"></i>
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
        <OrderDetail
            isShowing={isShowing}
            hide={toggle}
            id={id}
            />
    </div>
    
  )
}

export default OrderMain
