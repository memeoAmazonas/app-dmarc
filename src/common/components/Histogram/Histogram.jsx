import React from 'react';
import { injectIntl } from 'react-intl';
import { Chart } from 'react-google-charts';
import SkeletoLoading from 'common/components/Skeleton/SkeletoLoading';
import { theme } from 'src/theme';

const styles = {
  maxWidth: 1280, width: '100%', height: 500,
}
const Histogram = ({
  data, intl, label = 'empty',
}) => {
  const labels = intl.locale === 'es'
    ? { date: 'Fecha', quantity: 'Cantidad  ' }
    : { date: 'Date', quantity: 'Quantity  ' };
  const target = intl.formatMessage({
    id: label,
  })
  const options = {
    backgroundColor: theme.colors.grey5,
    selectionMode: 'multiple',
    pointsVisible: true,
    hAxis: {
      title: labels.date,
      titleTextStyle: { color: theme.colors.blue1 },
      gridlines: {
        color: theme.colors.grey5,
        minSpacing: 50,
      },
      slantedText: true,
    },
    vAxis: {
      minValue: 0,
      title: labels.quantity,
      titleTextStyle: { color: theme.colors.blue1 },
      gridlines: {
        color: theme.colors.grey5,
        minSpacing: 50,
      },
      format: 'short',
    },
    chartArea: {
      width: '80%',
      height: '70%',
      backgroundColor: {
        fill: theme.colors.grey1,
        stroke: theme.colors.blue1,
      },
    },
    lineWidth: 3,
    explorer: { axis: 'horizontal', maxZoomIn: 0.5 },
    legend: { position: 'top', textStyle: { color: theme.colors.blue3, fontSize: 18 } },
  }
  return (
    <Chart
      style={styles}
      chartType="LineChart"
      loader={<SkeletoLoading />}
      data={[[labels.date, target], ...data]}
      options={options}
      rootProps={{ 'data-testid': '4' }}
    />
  );
};

export default injectIntl(Histogram);
