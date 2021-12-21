import React, {useEffect, useState} from 'react';
import { PieChart, BarChart  } from 'echarts/charts';
import Store from "./strore";
import Chart from '@/components/charts';
import './index.scss';
const getPieOption = (data) => {
  return {
    color: [
      '#913C3C', '#CBAA7B', '#BEC0C2', '#C7674B', '#8A90A5','#DF9753'
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
        radius: ['20%', '65%'],
        roseType: 'angle',
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
      '#CBAA7B',
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
        type: 'value',
        name: '单位：亿',
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
export default () => {
  const [showYTD, setShowYTD] = useState(true);
  const [yearLineData, setYearLineData] = useState({x:[],y:[]});
  const [pieData, setPieData] = useState([]);
  const [yearPointer, setYearPointer] = useState({idxValue:'--', dataDate: '--'});
  const [monthPointer, setMonthPointer] = useState({idxValue:'--', dataDate: '--'});
  const [yearVsSply, setYearVsSply] = useState('--');
  const [monthVsSply, setMonthVsSply] = useState('--');
  const [yearFinishRate, setYearFinishRate] = useState('--');
  const [progress, setProgress] = useState('--');
  const [pMVsSply, setPMVsSply] = useState('--');
  const [pYFinishRate, setPYFinishRate] = useState('--');
  const [pYPointer, setPPointer] = useState('--');
  const [pYVsSpl, setPYVsSpl] = useState('--');

  const formatePieData = (data)=>{
    let res: any = [];
    for(let key in data){
      res.push({
        value: data[key],
        name: key,
        itemStyle: {borderWidth: 3, borderColor: '#fff'}
      })
    }
    res.sort((a, b)=>a.value-b.value)
    return res;
  }
  const formateLineData = (data)=>{
    let x: any = [];
    let y: any = []
    for(let key in data){
      x.push(key);
      y.push(data[key])
    }
    return {x,y};
  }
  const getYearData = ()=>{
    Store.getYDepartment().then((res)=>{
      res.code===200 && setPieData(formatePieData(res.data))
    })
    Store.getYPointerValues().then((res)=>{
      if(res.code===200){
        let {idxValue, dataDate} = res.data;
        dataDate = `${dataDate.slice(0,4)}-${dataDate.slice(4,6)}-${dataDate.slice(6,8)}`;
        setYearPointer({idxValue, dataDate})
      }
      // res.code===200 && setYearPointer(res.data);
    })
    Store.getYVSSply().then((res)=>{
      res.code===200 && setYearVsSply(res.data);
    })
    Store.getYFinishRate().then((res)=>{
      res.code===200 && setYearFinishRate(res.data);
    })
    Store.getMPointerValues({months: 12}).then((res)=>{
      res.code===200 && setYearLineData(formateLineData(res.data));
    })
    Store.getProgress().then((res)=>{
      res.code===200 && setProgress(res.data);
    })
    Store.getProfitMVslp().then((res)=>{
      res.code===200 && setPMVsSply(res.data);
    })
    Store.getProfitYFinishRate().then((res)=>{
      res.code===200 && setPYFinishRate(res.data);
    })
    Store.getProfitYPointerValue().then((res)=>{
      res.code===200 && setPPointer(res.data);
    })
    Store.getProfitYVSSply().then((res)=>{
      res.code===200 && setPYVsSpl(res.data);
    })
  }
  const getMonthData = ()=>{
    Store.getMDepartment().then((res)=>{
      res.code===200 && setPieData(formatePieData(res.data))
    })
    Store.getMPointerValue().then((res)=>{
      if(res.code===200){
        let {idxValue, dataDate} = res.data;
        dataDate = `${dataDate.slice(0,4)}-${dataDate.slice(4,6)}-${dataDate.slice(6,8)}`;
        setMonthPointer({idxValue, dataDate})
      }
    })
    Store.getMPointerValues({months: 12}).then((res)=>{
      res.code===200 && setYearLineData(formateLineData(res.data))
    })
    Store.getMVSLp().then((res)=>{
      res.code===200 && setMonthVsSply(res.data);
    })
  }
  const showMonthData = (YTD)=>{
    setShowYTD(YTD);
    if(YTD){
      getYearData();
    } else {
      getMonthData();
    }
  }
  useEffect(() => {
    getYearData();
  }, []);
  return (
    <div className='index-page' data-theme="light-theme">
      <div className='section-item'>
        <section>
          <div className='section-content'>
            <div className='display-flex page-top'>
              <div className='section-tilte'>营业收入情况</div>
              <div className='section-time'>*数据更新时间：{showYTD?yearPointer.dataDate:monthPointer.dataDate}</div>
            </div>
          </div>
          <div className='split'></div>
          <div className='type-slect'>
            <div className={`type-item ${showYTD?'type-slected':''}`} onClick={()=>{showMonthData(true)}}>YTD收入</div>
            <div className={`type-item ${showYTD?'':'type-slected'}`} onClick={()=>{showMonthData(false)}}>当月收入</div>
          </div>
          <div className='section-content'>
            <div className='sum-content sum-month'>
              <div className='num-item'>
                <div className='sub-title'>总金额(亿元)</div>
                <div className='num'><span className='data'>{showYTD?yearPointer.idxValue:monthPointer.idxValue}</span></div>
              </div>
              <div className='num-item num-normal'>
                <div className='sub-title'>{showYTD?'同比值':'环比'}</div>
                <div className='num'>{showYTD?yearVsSply:monthVsSply}</div>
              </div>
            </div>
            {showYTD&&<><div className='rate-bar'>
              <div className='rate-desc'>预算完成率</div>
              <div className='rate-chart'><div className='real-bar finish' style={{width: yearFinishRate}}></div></div>
              <div className='rate-data'>{yearFinishRate}</div>
            </div>
            <div className='rate-bar'>
              <div className='rate-desc'>时间进度</div>
              <div className='rate-chart'><div className='real-bar time' style={{width: progress}}></div></div>
              <div className='rate-data'>{progress}</div>
            </div></>}
          </div>
        </section>
        <div className='split'></div>
        <section className='chart'>
          <div className='chart-title'>营业收入占比</div>
          <Chart
            style={{ height: '100%', width: '100%'}}
            options={getPieOption(pieData)}
            components={[PieChart]}
          />
        </section>
        <div className='split'></div>
        <section className='month-bar-chart'>
          <div className='chart-title'>营收趋势</div>
          <Chart
              style={{ height: '100%',width: '100%', }}
              options={getLineOption(yearLineData)}
              components={[BarChart]}
            />
        </section>
      </div>
      <div className='section-item second-section'>
        <section>
          <div className='display-flex page-top'>
            <div className='section-tilte'>净利润</div>
          </div>
          <div className='split'></div>
          <div className='section-content'>
            <div className='sum-content sum-month'>
              <div className='num-item'>
                <div className='sub-title'>总金额(亿元)</div>
                <div className='num'><span className='data'>{pYPointer}</span></div>
              </div>
            </div>
            <div className='sum-content'>
              <div className='num-item num-normal'>
                <div className='sub-title'>同比值</div>
                <div className='num'>{pYVsSpl}</div>
              </div>
              <div className='num-item num-normal'>
                <div className='sub-title'>环比值</div>
                <div className='num down-num'>{pMVsSply}</div>
              </div>
            </div>
            <div className='rate-bar'>
              <div className='rate-desc'>预算完成率</div>
              <div className='rate-chart'><div className='real-bar finish' style={{width: pYFinishRate}}></div></div>
              <div className='rate-data'>{pYFinishRate}</div>
            </div>
            <div className='rate-bar'>
              <div className='rate-desc'>时间进度</div>
              <div className='rate-chart'><div className='real-bar time' style={{width: progress}}></div></div>
              <div className='rate-data'>{progress}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
    
  );
};