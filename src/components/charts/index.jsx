import React, { useCallback, useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { TitleComponent, TooltipComponent, LegendComponent,GridComponent  } from 'echarts/components';

const Chart = ({ renderType = 'canvas', options, style, components = [] }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  //初始化图表，设置配置项
  const renderChart = useCallback(() => {
    const render = echarts.getInstanceByDom(chartRef.current);
    if (render) {
      chartInstance.current = render;
    } else {
      chartInstance.current = echarts.init(chartRef.current, null, {
        renderer: renderType,
      });
    }
    chartInstance.current&&chartInstance.current.setOption(options);
  }, [chartRef, options, renderType]);

  useEffect(() => {
    // 注册必须的组件
    echarts&&echarts.use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent,GridComponent, ...components]);
  }, []);

  //监听屏幕变化，重绘图表
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    renderChart();
    return () => {
      const { current } = chartInstance || {};
      if (current) {
        current.dispose();
      }
    };
  }, [chartInstance, renderChart]);

  const handleResize = () => {
    const chart = chartInstance.current;
    if (chart) {
      chart.resize();
    }
  };

  return (
    <div
      ref={chartRef}
      className='chart-wrapper'
      style={{
        width: '100%',
        ...style,
      }}
    />
  );
};

export default Chart;
