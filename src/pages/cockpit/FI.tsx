import React, {useEffect, useState} from 'react';
import { PieChart, BarChart  } from 'echarts/charts';
import Store from "./strore";
import Chart from '@/components/charts';
import './index.scss';
import envConfig from '@/config'
import { cookie } from "@/utils/tools";
const getPieOption = (data) => {
  return {
    tooltip: {
      trigger: 'item',
      borderWidth: 0,
      formatter: (params)=> {
        let {value, name, vsSply} = params.data;
        if(vsSply.indexOf('-')<0 && vsSply.indexOf('+')<0){
          vsSply = `+${vsSply}`
        }
        let res = `<div style='width:77px;font-size: 10px;line-height: 1;'><div>${name}<span style='margin-left: 10px;'>${value}</span></div><div style='margin-top: 6px;'>同比<span style='margin-left: 2px;'>${vsSply}</span></div></div>`
        return res;
      }
    },
    legend: {
      orient: 'horizontal',
      icon: 'roundRect',
      itemHeight: 16,
      itemWidth: 16,
      bottom: '15%',
      data: ['IB','CCM','AM','EQ','WM','FI'],
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
          formatter: '{department|{b} {c}}\n{percent|{d}%}\n\n',
          lineHeight: 15,
          rich: {
          }
        },
        labelLine: {
          length: 5,
          length2: 5,
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
            borderWidth: 0,
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
    grid: {
      left: '1%',
      right: '2%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: x,
        axisLabel: {
          interval:0,
          rotate:40,
          textStyle: {
            fontSize : 10
          }
       }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位：亿',
        nameGap: 20,
        nameTextStyle:{
          padding:[0,0,0,-10],
          fontSize: 10
       }
      }
    ],
    series: [
      {
        name: '收入',
        label: {
          show: true,
          position: 'top',
          textStyle:{
            fontSize: 10
          }
        },
        type: 'bar',
        barWidth: '50%',
        data: y,
        emphasis: {
        	itemStyle: {
            color: '#AE8A58'
          }
        }
      }
    ]
  };
}
export default () => {
  const [showYTD, setShowYTD] = useState(true);
  const [yearLineData, setYearLineData] = useState({x:[],y:[]});
  const [profitLineData, setProfitLineData] = useState({x:[],y:[]});
  const [pieData, setPieData] = useState([]);
  const [yearPointer, setYearPointer] = useState({idxValue:'--', dataDate: '--'});
  const [monthPointer, setMonthPointer] = useState({idxValue:'--', dataDate: '--'});
  const [yearVsSply, setYearVsSply] = useState({data: '--', type: 'up'});
  const [monthVsSply, setMonthVsSply] = useState({data: '--', type: 'up'});
  const [yearFinishRate, setYearFinishRate] = useState('--');
  const [progress, setProgress] = useState('--');
  const [pMVsSply, setPMVsSply] = useState({data: '--', type: 'up'});
  const [pYFinishRate, setPYFinishRate] = useState('--');
  const [pYPointer, setPPointer] = useState({idxValue:'--', dataDate: '--'});
  const [pYVsSpl, setPYVsSpl] = useState({data: '--', type: 'up'});

  const formatePieData = (data)=>{
    const color= { 
      'IB':'#913C3C',
      'CCM':'#CBAA7B', 
      'AM':'#BEC0C2', 
      'EQ':'#C7674B',
      'WM':'#8A90A5',
      'FI':'#DF9753'
    };
    let res: any = [];
    data.forEach(element => {
      res.push({
        ...element,
        itemStyle: {borderWidth: 3, borderColor: '#fff',color: color[element.name]}
      })
    });
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
      res.code===200 && setPieData(formatePieData(res.data));
      if(res.code===500){
        cookie().remove('token');
        window.location.replace(`${envConfig.WXORIGIN}/connect/oauth2/authorize?appid=${envConfig.APPID}&redirect_uri=${encodeURI(window.location.href)}&response_type=code&scope=snsapi_userinfo&agentid=${envConfig.AGENTID}&state=CICC#wechat_redirect`)
      }
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
      res.code===200 && setYearVsSply(formateVsData(res.data));
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
      res.code===200 && setPMVsSply(formateVsData(res.data));
    })
    Store.getProfitYFinishRate().then((res)=>{
      res.code===200 && setPYFinishRate(res.data);
    })
    Store.getProfitYPointerValue().then((res)=>{
      if(res.code===200){
        let {idxValue, dataDate} = res.data;
        dataDate = `${dataDate.slice(0,4)}-${dataDate.slice(4,6)}-${dataDate.slice(6,8)}`;
        setPPointer({idxValue, dataDate})
      }
    })
    Store.getProfitYVSSply().then((res)=>{
      res.code===200 && setPYVsSpl(formateVsData(res.data));
    })
    Store.getNetProfitValues().then((res)=>{
      res.code===200 && setProfitLineData(formateLineData(res.data));
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
    Store.getMVSLp().then((res)=>{
      res.code===200 && setMonthVsSply(formateVsData(res.data));
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
  const formateVsData = (data)=>{
    if(data.indexOf('-')>-1){
      data = data.split('-')[1];
      return {type: 'up', data};
    }
    if(data.indexOf('+')>-1){
      data = data.split('+')[1];
      return {type: 'down', data}
    }
    return {type: 'up', data}
  }
  useEffect(() => {
    getYearData();
  }, []); // eslint-disable-line
  const showVsSply = showYTD?yearVsSply:monthVsSply;
  return (
    <div className='FI-page' data-theme="light-theme">
      <div className='section-item'>
        <section>
          <div className='section-content'>
            <div className='display-flex page-top'>
              <div className='section-tilte'>营业收入</div>
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
                <div className={`${showVsSply.type==='down'?'down-num':''} num`}>{showVsSply.data}</div>
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
          <div className='chart-title'>营业收入占比{`${showYTD?'（YTD）':''}`}</div>
          <Chart
            style={{ height: '100%', width: '100%'}}
            options={getPieOption(pieData)}
            components={[PieChart]}
          />
        </section>
        {showYTD&&<div className='split'></div>}
        {showYTD&&<section className='month-bar-chart'>
          <div className='chart-title'>营收趋势</div>
          <Chart
              style={{ height: '100%',width: '100%', }}
              options={getLineOption(yearLineData)}
              components={[BarChart]}
            />
        </section>}
      </div>
      <div className='section-item second-section'>
        <section>
          <div className='display-flex page-top'>
            <div className='section-tilte'>净利润</div>
            <div className='section-time'>*数据更新时间：{pYPointer.dataDate}</div>
          </div>
          <div className='split'></div>
          <div className='section-content'>
            <div className='sum-content sum-month'>
              <div className='num-item'>
                <div className='sub-title'>总金额(亿元)</div>
                <div className='num'><span className='data'>{pYPointer.idxValue}</span></div>
              </div>
            </div>
            <div className='sum-content'>
              <div className='num-item num-normal'>
                <div className='sub-title'>同比值</div>
                <div className={`${showVsSply.type==='down'?'down-num':''} num`}>{pYVsSpl.data}</div>
              </div>
              <div className='num-item num-normal'>
                <div className='sub-title'>环比值</div>
                <div className={`${showVsSply.type==='down'?'down-num':''} num`}>{pMVsSply.data}</div>
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
        <div className='split'></div>
        <section className='month-bar-chart'>
          <div className='chart-title'>净利润趋势</div>
          <Chart
              style={{ height: '100%',width: '100%', }}
              options={getLineOption(profitLineData)}
              components={[BarChart]}
            />
        </section>
      </div>
    </div>
    
  );
};