import React, { useEffect, useState, useCallback, useRef } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Layout from './Layout'
import Loading from '../components/loadingError/Loading';
import UserMain from '../components/dashboard/user/UserMain'
import Highcharts from 'highcharts';
import { useDispatch,useSelector } from "react-redux";
import { getRevenueByMonth, getRevenueByDate} from '../redux/actions/RevenueAction'
import { getAllProducts } from '../redux/actions/ProductAction'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageRevenueDateScreen = () => {
  const [isMonthPicker, setMonthPicker] = useState('');
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
    const revenueOfDate = useSelector((state) => state.revenueOfDate);
    const { loading, revenue, revenueList } = revenueOfDate;
    // const revenueOfAMonth = useSelector((state) => state.revenueOfDate);
    // const { arevenueList } = revenueOfAMonth;
    const [date, setDate]=useState({
        modifiedDate: startDate.getDate() + '/' + (startDate.getMonth()+1) +'/'+ startDate.getFullYear(),
    })
    const dispatch = useDispatch();
    //const dataname:[];
    const dataproduct={id: [], data: [], name: []};
    useEffect(() => {
      const chart = Highcharts.chart(refContainer.current, {
        chart: {
            animation: {
                duration: 500
            },
            marginRight: 50
        },
        title: {
            text: `Quantity Sold By Product On ${date.modifiedDate}`,
            align: 'center'
        },
        subtitle: {
            useHTML: true,
            text: getSubtitle(),
            floating: true,
            align: 'right',
            verticalAlign: 'top',
            y: 30,
            x: 10
        },

        legend: {
            enabled: false
        },
        xAxis: {
          categories: dataproduct.name
        },
        yAxis: {
            opposite: true,
            tickPixelInterval: 150,
            title: {
                text: 'Quantity'
            }
        },
        plotOptions: {
            series: {
                animation: false,
                groupPadding: 0,
                pointPadding: 0.1,
                borderWidth: 0,
                colorByPoint: true,
                dataSorting: {
                    enabled: false,
                    matchByName: true
                },
                type: "bar",
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
          {
            type:'bar',
            name: 'Quantity',
            data: dataproduct.data,
          }

        ],
        //series: dataMotnh,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 550
                },
                chartOptions: {
                    xAxis: {
                        visible: false
                    },
                    subtitle: {
                        x: 0
                    },
                    plotOptions: {
                        series: {
                            dataLabels: [{
                                enabled: true,
                                y: 8
                            }, {
                                enabled: true,
                                format: '{point.name}',
                                y: -8,
                                style: {
                                    fontWeight: 'normal',
                                    opacity: 0.7
                                }
                            }]
                        }
                    }
                }
            }]
        }
      });
  
      if (dataproduct.data.length > 0) {
        chart.hideLoading();
      }
      else {
        chart.showLoading();
      }
    }, [dataproduct]);

    for(let j in products){
      dataproduct.name.push(products[j].name);
      dataproduct.id.push(products[j].id);
      dataproduct.data.push(0);
    }
    for(let j in dataproduct.data){
      for(let i in revenueList){
        if(Number(dataproduct.id[j])===Number(revenueList[i].productId)){
          dataproduct.data[j]=revenueList[i].productAmount;
          revenueList[i].nameProduct=dataproduct.name[j];
          
          break;
        }
      }
    }

    function getSubtitle() {
      return `
          <span style="font-size: 22px">
              Total: <b>${revenue.revenue}</b> $
          </span>`;
  }

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getRevenueByDate({date}))
        if(date.modifiedDate){
          dataproduct.name=[];
          dataproduct.id=[];
          dataproduct.data=[];
        }
    }, [date]);

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

    const ListItem = () => {
      return (
          <tr>
              <td className="text-nowrap align-middle"><Skeleton/></td>
              <td className="text-nowrap align-middle"><Skeleton/></td>
              <td className="text-nowrap align-middle"><Skeleton/></td>
          </tr>
      ); 
  }
  return (
    <div className="wrapper1">
        <Layout/>

        <div className="e-panel cardcus" style={{width:"100%"}}>
                <div className="card-body">
                
                    <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                        <div className="mb-3 form-inline">
                        <button className="button-2 mr-2" onClick={handleClick1}>
                          {!isTable?"Back":"Graphic"}
                        </button>
                        <br></br>
                        <br></br>
                        {isTable&&
                        <button className="button-2" onClick={handleClick}>
                          Date: {startDate.getDate()}/{startDate.getMonth()+1}/{startDate.getFullYear()}
                          <i>  </i>
                          <i className="tf-ion-android-calendar"></i>
                        </button>}
                        </div>
                        {isOpen && isTable && (
                          <div style={{margin: "-15px 70px", position: "absolute"}}>
                                <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                  setStartDate(date);
                                  setDate({modifiedDate: date.getDate() + '/' + (date.getMonth()+1) +'/'+ date.getFullYear()});
                                  setIsOpen(!isOpen);
                                }
                              }
                                dateFormat="dd/MM/yyyy"
                                inline
                              />
                          </div>
                        )}
                        {isTable?
                      <>
                          <div ref={refContainer} hidden>
                          </div>
                          <table className="table table-bordered table-hover">
                            <thead align="center">
                            <tr>
                                <th>Name</th>
                                <th>Sold</th>
                                <th>Revenue</th>
                            </tr>
                            </thead>
                            {((revenueList.length>0 && !revenueList[revenueList.length-1].nameProduct) || (loading))? (
                                <tbody align="center">
                                  <ListItem/><ListItem/><ListItem/><ListItem/><ListItem/>
                                </tbody>):
                            <tbody align="center">
                            {revenueList&&revenueList.sort((a,b)=>(b.productAmount-a.productAmount)).map((item)=> (
                            <tr>
                              <td className="align-middle">{item.nameProduct}</td>
                              <td className="text-nowrap align-middle">{item.productAmount}</td>
                              <td className="text-nowrap align-middle">${item.totalPrice}</td>
                            </tr>
                            
                            ))}          
                            </tbody>}
                            {((revenueList.length>0 && !revenueList[revenueList.length-1].nameProduct) || (loading))? (
                                <tfoot align="center">
                                  <tr>
                                    <th colspan="2"><Skeleton/></th>
                                    <th colspan="1"><Skeleton/></th>
                                  </tr>
                                </tfoot>):
                            <tfoot align="center">
                            <tr>
                              <th colspan="2">Total</th>
                              <th colspan="1">${revenue.revenue}</th>
                            </tr>
                            </tfoot>}
                          </table>
                          </>
                        :
                        <div className="e-panel cardcus parent" style={{width:"100%"}}>
                        <table className="child" ref={refContainer} style={{border:"2px soild", position: "initial"}}>
                        </table>
                        </div>
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

export default ManageRevenueDateScreen