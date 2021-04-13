import React from 'react';
import concat from 'lodash/concat'
import { Chart } from 'react-google-charts';
import SkeletoLoading from 'common/components/Skeleton/SkeletoLoading';

const Histogram = ({
  data, width, height, style,
}) => {
  return (
    <Chart
      style={style}
      chartType="LineChart"
      loader={<SkeletoLoading />}
      data={concat(['Year', 'Sales', 'Expenses'], data)}
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
