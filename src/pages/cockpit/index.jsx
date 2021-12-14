import React, {useEffect, useState} from 'react';
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart, BarChart  } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
// 引入封装好的组件
import Chart from '../../components/charts';
import './index.scss';

const getOption = () => {
  return {
    color: [
      '#fda280', '#c1dbfe', '#d1a9fe', '#6c9de2', '#8796cb','#25d4db'
    ],
    title: {
      text: '部门分布',
      left: '0',
      textStyle:{
        color:'#525c80', //颜色
        fontStyle:'normal', //风格
        fontWeight:'normal', //粗细
        fontFamily:'Microsoft yahei', //字体
        fontSize:16, //大小
        align:'center' //水平对齐
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}, ({d}%)',
    },
    legend: {
      orient: 'vertical',
      icon: 'roundRect',
      itemHeight: 7,
      right: 0,
    },
    grid: {
      // right: '20%',containLabel: true,
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        left: 0,
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: {
          position: 'outer',
          alignTo: 'labelLine',
          bleedMargin: 5,
          formatter: '{department|{b}}\n{percent|{d}%}',
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
  title: {
    text: '历史趋势',
    left: '0',
    textStyle:{
      color:'#525c80', //颜色
      fontStyle:'normal', //风格
      fontWeight:'normal', //粗细
      fontFamily:'Microsoft yahei', //字体
      fontSize:16, //大小
      align:'center' //水平对齐
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['21-06', '21-07', '21-08', '21-09', '21-10', '21-11', '21-12'],
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
      barWidth: '16px',
      data: [10, 52, 40, 69, 20, 50, 45]
    }
  ]
};

export default () => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className='index-page'>
      <section>
        <div className='section-tilte'>
          营业收入情况
        </div>
        <div className='section-content'>
          <div className='sum-content'>
            <div className='num-item'>
              <div>营业收入</div>
              <div><span className='num'>500.00</span><span className='unit'>亿元</span></div>
            </div>
            <div className='num-item num-normal'>
              <div>同比</div>
              <div className='num'>50.00%</div>
            </div>
            <div className='num-item'>
              <div>预算完成率</div>
              <div className='num'>50.00%</div>
            </div>
          </div>
          <Chart
            style={{ height: '240px',width: '100%', }}
            options={getOption()}
            components={[PieChart]}
          />
        </div>
      </section>
      {showDetail&&
      <section className='has-margin has-animation'>
        <div className='section-content'>
          <div className='sum-content'>
            <div className='num-item'>
              <div>营业收入</div>
              <div><span className='num'>500.00</span><span className='unit'>亿元</span></div>
            </div>
            <div className='num-item num-normal'>
              <div>环比</div>
              <div className='num'>50.00%</div>
            </div>
          </div>
          <Chart
            style={{ height: '240px',width: '100%', }}
            options={getOption()}
            components={[PieChart]}
          />
          <Chart
            style={{ height: '260px',width: '100%', }}
            options={barCharts}
            components={[BarChart, GridComponent ]}
          />
        </div>
      </section>}
      <section className='has-margin'>
         <div className='button section-content' onClick={()=>{setShowDetail(!showDetail)}}>{showDetail?'收起当月情况':'当月情况'}</div>
      </section>
      
    </div>
    
  );
};