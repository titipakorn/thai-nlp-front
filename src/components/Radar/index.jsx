import React, { useState, useEffect } from 'react';
import { Radar } from '@ant-design/charts';
const DemoRadar = props => {
  const { data } = props;
  const config = {
    title: {
      visible: true,
      alignTo: 'middle',
      text: 'Facial Expression Rate',
    },
    data,
    angleField: 'item',
    radiusField: 'score',
    seriesField: 'user',
    radiusAxis: { grid: { line: { type: 'line' }, alternateColor: ['rgba(0, 0, 0, 0.04)', null] } },
    line: { visible: true },
    angleAxis: {
      grid: {
        visible: true,
      },
      label: {
        style: {
          fontSize: '16',
        },
      },
    },
    point: {
      visible: true,
      shape: 'circle',
    },
    legend: {
      visible: true,
      position: 'bottom-center',
    },
  };
  return <Radar {...config} />;
};
export default DemoRadar;
