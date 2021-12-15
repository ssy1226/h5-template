import React, {useEffect, useState} from 'react';
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart, BarChart  } from 'echarts/charts';
// 引入封装好的组件
import Chart from '../../components/charts';
import './index.scss';

const getOption = () => {
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
        data: [
          { value: 848, name: 'IB'},
          { value: 735, name: 'CCM' },
          { value: 580, name: 'AM' },
          { value: 484, name: 'EQ' },
          { value: 400, name: 'WM' },
          { value: 300, name: 'FI' }
        ],
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
const barCharts = {
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
      data: ['21-01','21-02','21-03','21-04','21-05','21-06', '21-07', '21-08', '21-09', '21-10', '21-11', '21-12'],
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
      data: [10, 52, 40, 69, 20, 50, 52, 40, 69, 20, 50, 45]
    }
  ]
};

export default () => {
  const [showDetail, setShowDetail] = useState(false);
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
              <div className='num'><span className='data'>500.00</span><span className='unit'>亿元</span></div>
            </div>
            <div className='num-item num-normal'>
              <div className='sub-title'>同比</div>
              <div className='num'>50.00%</div>
            </div>
            <div className='num-item'>
              <div className='sub-title'>预算完成率</div>
              <div className='num'>50.00%</div>
              <div className='progress-bar'>
                <div className='real-bar' style={{width: '50%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='split'></div>
      <section className='chart'>
        <div className='chart-title'>营业收入</div>
        <Chart
          style={{ height: '100%', width: '100%'}}
          options={getOption()}
          components={[PieChart]}
        />
      </section>
      <section>
         <div className='button' onClick={()=>{setShowDetail(!showDetail)}}>
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
                <div className='num'><span className='data'>500.00</span><span className='unit'>亿元</span></div>
              </div>
              <div className='num-item num-normal'>
                <div className='sub-title'>环比</div>
                <div className='num'>50.00%</div>
              </div>
            </div>
          </div>
        </section>
        <section className='month-pie-chart chart'>
          <div className='chart-title'>营业收入</div>
          <Chart
            style={{ height: '100%', width: '100%'}}
            options={getOption()}
            components={[PieChart]}
          />
        </section>
        <div className='split'></div>
        <section className='month-bar-chart'>
          <div className='chart-title'>历史趋势</div>
          <Chart
              style={{ height: '100%',width: '100%', }}
              options={barCharts}
              components={[BarChart]}
            />
        </section>
      </>}
    </div>
    
  );
};