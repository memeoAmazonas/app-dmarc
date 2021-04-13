import React from 'react';
import concat from 'lodash/concat'
import { Chart } from 'react-google-charts';
import SkeletoLoading from 'common/components/Skeleton/SkeletoLoading';

const Histogram = ({
  data, width, height, style, init = 0, final = 14,
}) => {
  const maxs = 200000000;
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const data1 = () => {
    const response = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < 90; i++) {
      response.push([i.toString(), getRandomInt(0, maxs), getRandomInt(0, maxs)])
    }
    return response;
  }
  return (
    <Chart
      style={style}
      chartType="LineChart"
      loader={<SkeletoLoading />}
      data={concat(['Year', 'Sales', 'Expenses'],data1().slice(init, final))}
      options={{
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333fff' } },
        vAxis: { minValue: 0 },
        // For the legend to fit, we make the chart area smaller
        chartArea: { width: '75%', height: '80%' },
        // lineWidth: 25
      }}
      // For tests
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default Histogram;
