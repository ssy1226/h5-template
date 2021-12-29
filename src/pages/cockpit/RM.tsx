import React from 'react';
import { PieChart  } from 'echarts/charts';
// import Store from "./strore";
import Chart from '@/components/charts';
import './RM.scss';

function Index() {
    const data1 = [
        {value:0.48, name:'资本杠杆率',state:0,}
    ];
    const data2 = [
        {value:0.48, name:'资本杠杆率',state:1,}
    ];
    const data3 = [
        {value:0.48, name:'资本杠杆率',state:2,}
    ];
    const getPieOption = (data) => {

        return {
            color: data[0].state==0? ['#4cad7a', '#f0f2f5',] : data[0].state==1? ['#DF9753', '#f0f2f5',]:['#C7674B', '#f0f2f5',],
            title: {
                show: true,
                text: data[0].value*100 +'%',
                x:'center',
                y:'39%',
                textStyle: {
                    fontSize:'17',
                    color:'black',
                    fontWeight:'bolder',
                }
            },
            tooltip: {
                show: false
            },
            series: [
                {
                    type: "pie",
                    radius: ['65%', '80%'],
                    clockWise: true,//是否顺时针
                    selectedMode: null,//选中模式，默认关闭，可选single，multiple
                    avoidLabelOverlap:true,
                    silent:true,
                    label: {
                      normal: {
                          show: false,
                          position: 'center',
                      } ,
                      emphasis: {
                          show:false,
                      }  ,
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        } ,
                    },
                    data: [
                        {name:data[0].name, value:data[0].value},
                        {value:1-data[0].value}
                    ],
                }
            ]
        }
    };
  return (
    <div className="index-page">
        <div className="content">
            <div className='title-wrapper'>
                <div className="title">风险指标</div>
                <div className='section-time'>*数据更新时间：{'2021-11-30'}</div>
            </div>
            <div className="line"></div>
            <div className="pies-content">
                <div className="first-line">
                    <div className="pies">
                        <Chart
                            style={{ height: '100px', width: '100%'}}
                            options={getPieOption(data1)}
                            components={[PieChart]}
                        />
                        <div className="pies-name">资本杠杆率</div>
                    </div>
                    <div className="pies">
                        <Chart
                            style={{ height: '100px', width: '100%'}}
                            options={getPieOption(data2)}
                            components={[PieChart]}
                        />
                        <div className="pies-name">风险覆盖率</div>
                    </div>
                    <div className="pies">
                        <Chart
                            style={{ height: '100px', width: '100%'}}
                            options={getPieOption(data3)}
                            components={[PieChart]}
                        />
                        <div className="pies-name">流动性覆盖率</div>
                    </div>
                </div>
                <div className="second-line">
                    <div className="pies" style={{marginLeft:'16.5%'}}>
                        <Chart
                            style={{ height: '100px', width: '100%'}}
                            options={getPieOption(data3)}
                            components={[PieChart]}
                        />
                        <div className="pies-name">风险覆盖率</div>
                    </div>
                    <div className="pies">
                        <Chart
                            style={{ height: '100px', width: '100%'}}
                            options={getPieOption(data1)}
                            components={[PieChart]}
                        />
                        <div className="pies-name">VaR</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index
