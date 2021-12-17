import React, {useEffect, useState} from 'react';
import { PieChart, BarChart  } from 'echarts/charts';
import Store from "./strore";
import Chart from '@/components/charts';
import './index.scss';
const getPieOption = (data) => {
  return {
    color: [
      '#C4DDFD', '#9CBCFF', '#7FA7FA', '#6695F9', '#4E85F4','#366BD8'
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}, ({d}%)',
    },
    legend: {
      orient: 'horizontal',
      icon: 'roundRect',
      itemHeight: 16,
      itemWidth: 16,
      bottom: '15%',
      textStyle:{
        color: 'rgba(44,53,66,0.65)',
        fontSize:12,
        lineHeight: 16
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        left: 0,
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        label: {
          align: 'left',
          position: 'outer',
          alignTo: 'labelLine',
          formatter: '{department|{b}}\n{percent|{d}%}\n\n',
          minMargin: 20,
          lineHeight: 15,
          rich: {
          }
        },
        labelLine: {
          length: 10,
          length2: 10,
          maxSurfaceAngle: 80
        },
        labelLayout: function (params) {
          const isLeft = params.labelRect.x < 100;
          const points = params.labelLinePoints;
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points
          };
        },
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
};
const getLineOption = ({x,y})=>{
  return {
    color: [
      '#5B8FF9',
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: x,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval:0,
          rotate:40
       }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '收入',
        label: {
          show: true,
          position: 'top',
        },
        type: 'bar',
        barWidth: '50%',
        data: y
      }
    ]
  };
}
let firstGetMonthData = false;
export default () => {
  const [showDetail, setShowDetail] = useState(false);
  const [yearLineData, setYearLineData] = useState({x:[],y:[]});
  const [yearPieData, setYearPieData] = useState([]);
  const [monthPieData, setMonthPieData] = useState([]);
  const [yearPointer, setYearPointer] = useState('--');
  const [monthPointer, setMonthPointer] = useState('--');
  const [yearVsSply, setYearVsSply] = useState('--');
  const [monthVsSply, setMonthVsSply] = useState('--');
  const [yearFinishRate, setYearFinishRate] = useState('--');
  const formatePieData = (data)=>{
    let res = [];
    for(let key in data){
      res.push({
        value: data[key],
        name: key
      })
    }
    return res;
  }
  const formateLineData = (data)=>{
    let x = [];
    let y = []
    for(let key in data){
      x.push(key);
      y.push(data[key])
    }
    return {x,y};
  }
  const getYearData = ()=>{
    Store.getYDepartment().then((res)=>{
      setYearPieData(formatePieData(res.data))
    })
    Store.getYPointerValues().then((res)=>{
      setYearPointer(res.data);
    })
    Store.getYVSSply().then((res)=>{
      setYearVsSply(res.data);
    })
    Store.getYFinishRate().then((res)=>{
      setYearFinishRate(res.data);
    })
  }
  const getMonthData = ()=>{
    Store.getMDepartment().then((res)=>{
      setMonthPieData(formatePieData(res.data))
    })
    Store.getMPointerValue().then((res)=>{
      setMonthPointer(res.data);
    })
    Store.getMPointerValues({months: 12}).then((res)=>{
      setYearLineData(formateLineData(res.data))
    })
    Store.getMVSLp().then((res)=>{
      setMonthVsSply(res.data);
    })
  }
  const showMonthData = ()=>{
    if(showDetail){
      setShowDetail(false)
    } else {
      if(!firstGetMonthData){
        getMonthData()
        firstGetMonthData = true;
      }
      setShowDetail(true);
    }
  }
  useEffect(() => {
    console.log('useEffect');
    getYearData();
  }, []);
  return (
    <div className='index-page' data-theme="light-theme">
      <section>
        <div className='section-content'>
          <div className='display-flex page-top'>
            <div className='section-tilte'>营业收入情况</div>
            <div className='section-time'>*数据更新时间：2021-11-30</div>
          </div>
        </div>
      </section>
      <div className='split'></div>
      <section>
        <div className='section-content'>
          <div className='sum-content'>
            <div className='num-item'>
              <div className='sub-title'>营业收入</div>
              <div className='num'><span className='data'>{yearPointer}</span><span className='unit'>亿元</span></div>
            </div>
            <div className='num-item num-normal'>
              <div className='sub-title'>同比</div>
              <div className='num'>{yearVsSply}</div>
            </div>
            <div className='num-item'>
              <div className='sub-title'>预算完成率</div>
              <div className='num'>{yearFinishRate}</div>
              <div className='progress-bar'>
                <div className='real-bar' style={{width: yearFinishRate}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='split'></div>
      <section className='chart'>
        <div className='chart-title'>部门分布</div>
        <Chart
          style={{ height: '100%', width: '100%'}}
          options={getPieOption(yearPieData)}
          components={[PieChart]}
        />
      </section>
      <section>
         <div className='button' onClick={showMonthData}>
           {showDetail?<span className='open arrow'>收起当月情况</span>:
           <span className='close arrow'>当月情况</span>}
          </div>
      </section>
      {showDetail&&
      <>
        <section>
          <div className='section-content'>
            <div className='sum-content sum-month'>
              <div className='num-item'>
                <div className='sub-title'>营业收入</div>
                <div className='num'><span className='data'>{monthPointer}</span><span className='unit'>亿元</span></div>
              </div>
              <div className='num-item num-normal'>
                <div className='sub-title'>环比</div>
                <div className='num'>{monthVsSply}</div>
              </div>
            </div>
          </div>
        </section>
        <section className='month-pie-chart chart'>
          <div className='chart-title'>部门分布</div>
          <Chart
            style={{ height: '100%', width: '100%'}}
            options={getPieOption(monthPieData)}
            components={[PieChart]}
          />
        </section>
        <div className='split'></div>
        <section className='month-bar-chart'>
          <div className='chart-title'>历史趋势</div>
          <Chart
              style={{ height: '100%',width: '100%', }}
              options={getLineOption(yearLineData)}
              components={[BarChart]}
            />
        </section>
      </>}
    </div>
    
  );
};