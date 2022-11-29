import React, { useEffect, useState, useCallback, useRef } from "react";
import Layout from './Layout'
import UserMain from '../components/dashboard/user/UserMain'
import Highcharts from 'highcharts';
import { useDispatch,useSelector } from "react-redux";
import { getRevenueByMonth} from '../redux/actions/RevenueAction'
import { getAllProducts } from '../redux/actions/ProductAction'
const ManageRevenueScreen = () => {
    const refContainer = useRef(null);
    const [dataSource, setDataSource] = useState([]);
  
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
    const [month, setMonth]=useState({
        year: 2022,
    })
    const dispatch = useDispatch();
    const datap=[];

    useEffect(() => {
      const chart = Highcharts.chart(refContainer.current, {
        chart: {
          type: 'line'
        }, // type of the chart
        title: {
          text: 'Line Chart Of Poduct By Months Of Year'
        }, // title of the chart
        subtitle: {
          text: 'Lorem Ipsum is simply dummy text'
        }, // subtitle of the chart
        yAxis: {
          title: {
            text: 'Total Price $'
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
        series: datap // set of the data
      });
  
      if (datap.length > 0) {
        chart.hideLoading();
      }
      else {
        chart.showLoading();
      }
    }, [datap]);
    // const datap=[];
    for(let j in products){
      datap.push({'id':products[j].id,'name':products[j].name, 'data':[0,0,0,0,0,0,0,0,0,0,0,0]})
    }
    for(let i in revenueList){
      for(let j in datap){
        if(datap[j].id===Number(revenueList[i].productId)){
          datap[j].data[Number(revenueList[i].month-1)]=Number(datap[j].data[Number(revenueList[i].month-1)])+Number(revenueList[i].totalPrice);
        }
      }
    }
    console.log("a",datap)
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getRevenueByMonth({month}))
    }, []);


    const [active, setActive] =useState(false);
    const handle = useCallback(() => {
        if(!active) {
            setActive(true);
        }
        else setActive(false);
    }, [active]);
  return (
    <div class="wrapper1">
            <Layout active={active}/>
                <nav class="navbar navbar1-expand-lg navbar1-light bg-light">
                    <div class="container-fluid">
                        <button type="button" id="sidebarCollapse" class="btn btn-info"  onClick={handle}>
                            {!active?<i class="tf-ion-ios-arrow-left"></i>:
                            <i class="tf-ion-ios-arrow-right"></i>}
                        </button>

                    </div>
                </nav>
                <div className="e-panel cardcus parent">

                <div className="card-body">
                    <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                            <table className="child">
                              <div ref={refContainer}/>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                
              </div>
          </div>
        </div>
  )
}

export default ManageRevenueScreen