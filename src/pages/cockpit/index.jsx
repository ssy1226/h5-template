import React from 'react';
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart } from 'echarts/charts';
// 引入封装好的组件
import Chart from '../../components/charts';

const getOption = (progress) => {
  return {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
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

export default () => {
  return (
    <div className='index-page'>

      <Chart
        style={{ height: '100%' }}
        options={getOption(30)}
        components={[PieChart]}
    />
    </div>
    
  );
};