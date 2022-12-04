import React, { useEffect, useState, useCallback, useRef } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Layout from './Layout'
import UserMain from '../components/dashboard/user/UserMain'
import Highcharts from 'highcharts';
import { useDispatch,useSelector } from "react-redux";
import { getRevenueByMonth, getRevenueByDate} from '../redux/actions/RevenueAction'
import { getAllProducts } from '../redux/actions/ProductAction'
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
    const { revenue, revenueList } = revenueOfDate;
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
          break;
        }
      }
    }

    function getSubtitle() {
      return `
          <span style="font-size: 22px">
              Total: <b>: ${revenue.revenue}</b> $
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
                        <div className="table-responsive table-lg mt-3">
                        <button className="btn btn-info" onClick={handleClick}>
                          Date: {startDate.getDate()}/{startDate.getMonth()+1}/{startDate.getFullYear()}
                          <i>  </i>
                          <i className="tf-ion-android-calendar"></i>
                        </button>
                        {isOpen && (
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
                        )}
                        
                        <table className="child" ref={refContainer} style={{border:"2px soild"}}/>
                            {/* <table className="table table-bordered">
                              <div className="child" ref={refContainer}/>
                            </table> */}
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