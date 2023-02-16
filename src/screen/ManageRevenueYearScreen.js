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
    const { arevenueList } = revenueOfAMonth;
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
    
    for(let i in arevenueList){
        dataMotnh[0].data[Number(arevenueList[i].month)-1]=Number(arevenueList[i].totalPrice);
    }


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
    console.log("data", revenueList)
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
        <div className="e-panel cardcus parent">
                <div className="card-body">
          
                    <div className="e-table">
                        <div className="table-responsive table-lg mt-3 align-top">
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
                            <table className="child" ref={refContainer}/>
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