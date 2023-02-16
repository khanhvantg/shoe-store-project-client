import React, { useEffect, useState, useCallback, useRef } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Layout from './Layout'
import UserMain from '../components/dashboard/user/UserMain'
import Highcharts from 'highcharts';
import { useDispatch,useSelector } from "react-redux";
import { getRevenueByMonth, getARevenueByMonth} from '../redux/actions/RevenueAction'
import { getAllProducts } from '../redux/actions/ProductAction'
import { Fragment } from "react";
import Loading from "../components/loadingError/Loading";
const ManageRevenueYearScreen = () => {
  const [isMonthPicker, setMonthPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
    const refContainer = useRef(null);
    const [dataSource, setDataSource] = useState([]);
    const [option, setOption]=useState('YEAR')
    // const categoryList=[];
    // for (let i in categories) {
    //     const cate = { names: categories[i].id, label: categories[i].name};
    //     categoryList.push(cate);
    // }
    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    const [re,setRe]=useState([]);
    const revenueOfMonth = useSelector((state) => state.revenueOfMonth);
    const { revenue, revenueList } = revenueOfMonth;
    const revenueOfAMonth = useSelector((state) => state.revenueOfAMonth);
    const { loading, arevenueList } = revenueOfAMonth;
    const [month, setMonth]=useState({
        year: startDate.getFullYear(),
    })
    const dispatch = useDispatch();
    const [data, setData]=useState([]);
    const dataMotnh=[{'name':'Revenue','data':[0,0,0,0,0,0,0,0,0,0,0,0]}];
    useEffect(() => {
      const chart = Highcharts.chart(refContainer.current, {
        chart: {
          type: 'column'
        }, // type of the chart
        title: {
          text: `Monthly Revenue Chart In ${month.year}`
        }, // title of the chart
        // subtitle: {
        //   text: 'Lorem Ipsum is simply dummy text'
        // }, // subtitle of the chart
        yAxis: {
          title: {
            text: 'Reveune $'
          }, // the title of the Y Axis
        },
        xAxis: {
          min: 0.4,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          title: {
            text: 'Month'
          } // the title of the X Axis
        },
        tooltip: {
          headerFormat: '<span style="font-size:13px;font-weight:bold;">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} $</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        }, // tooltip appears when hovering over a point
        credits: {
          enabled: false
        },
        series: dataMotnh // set of the data
      });
  
      if (dataMotnh.length > 0) {
        chart.hideLoading();
      }
      else {
        chart.showLoading();
      }
    }, [dataMotnh]);

    var total = 0;
    for(let i in arevenueList){
        dataMotnh[0].data[Number(arevenueList[i].month)-1]=Number(arevenueList[i].totalPrice);
        console.log(Number(arevenueList[i].totalPrice))
        total=total+Number(arevenueList[i].totalPrice);
    }
    for (let i in dataMotnh[0].data){
      if(dataMotnh[0].data[i]===0 && arevenueList.length<12){
        arevenueList.push({
          month: (Number(i)+1).toString(),
          totalPrice: 0,
        })
      }
    }
    
    console.log("a",arevenueList)
    useEffect(() => {
        dispatch(getARevenueByMonth({month}))
        if(month){
          dataMotnh[0].data=[0,0,0,0,0,0,0,0,0,0,0,0];
        }
    }, [month]);
    const [active, setActive] =useState(false);
    const handle = () => {
        if(!active) {
            setActive(true);
        }
        else setActive(false);
    };

    const [isOpen, setIsOpen] = useState(false);
    
    const handleClick = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };
    
    const [isTable, setIsTable] = useState(true);
    const handleClick1 = (e) => {
      e.preventDefault();
      setIsTable(!isTable);
    };
    console.log(startDate.getMonth()+1)
  return (
    <div className="wrapper1">
        <Layout active={active}/>
        <nav className="navbar navbar1-expand-lg navbar1-light bg-light">
            <div className="container-fluid">
                <button type="button" id="sidebarCollapse" className="btn btn-info"  onClick={handle}>
                    {!active?<i className="tf-ion-ios-arrow-left"></i>:
                    <i className="tf-ion-ios-arrow-right"></i>}
                </button>

            </div>
        </nav>
        <div className={isTable?"e-panel cardcus":"e-panel cardcus parent"} style={{width:"100%"}}>
                <div className="card-body">
                    <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                        <button className="btn btn-info" onClick={handleClick1}>
                          {isTable?"Table":"Graph"}
                        </button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-info" type="button" onClick={handleClick}>
                          Year: {startDate.getFullYear()}
                          <i>  </i>
                          <i className="tf-ion-android-calendar"></i>
                        </button>
                        {isOpen && (
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                              setMonthPicker(false);
                              setStartDate(date);
                              setMonth({'year':date.getFullYear()});
                              setIsOpen(!isOpen);
                            }
                            
                          }
                            dateFormat="yyyy"
                            showYearPicker
                            showFullYearPicker
                            inline
                          />)}
                            {isTable?
                      <>
                          <div ref={refContainer} hidden>
                          </div>
                          {((revenueList.length>0 && !revenueList[revenueList.length-1].nameProduct) || (loading))? (
                                <Loading />):
                          <table className="table table-bordered table-hover">
                            <thead align="center">
                            <tr>
                                <th>Month</th>
                                <th>Revenue</th>
                            </tr>
                            </thead>
                            <tbody align="center">
                            {arevenueList&&arevenueList.sort((a,b)=>(a.month-b.month)).map((item)=> (
                            <tr>
                              <td className="align-middle">{item.month}</td>
                              <td className="text-nowrap align-middle">${item.totalPrice}</td>
                            </tr>
                            
                            ))}          
                            </tbody>
                            <tfoot align="center">
                            <tr>
                              <th colspan="1">Total</th>
                              <th colspan="1">${total}</th>
                            </tr>
                            </tfoot>
                          </table>}
                          </>
                        :
                        <table className="child" ref={refContainer} style={{border:"2px soild"}}>
                        </table>
}
                        </div>
                    </div>
                </div>
                <div>
                
              </div>
          </div>
       
          </div>
       
  )
}

export default ManageRevenueYearScreen