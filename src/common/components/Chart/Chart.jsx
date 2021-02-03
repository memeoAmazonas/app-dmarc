import React from 'react';
import _ from 'lodash';
import { injectIntl } from 'react-intl'
import styled from 'styled-components';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';
import Skeleton from '@material-ui/lab/Skeleton';

import Card from 'common/components/Card';
import Font from 'common/components/Font';
import { theme } from 'src/theme';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import ChartHeader from './ChartHeader';

const Label = styled.div`
  width: 100%;
  top: 52%;
  text-align: center;
  position: absolute;
`;

const ChartContainer = styled.div`
  position: relative;
`;

const StyledSkeleton = styled(Skeleton)`
  min-height: 165px;
`
const Chart = ({
  headerKey,
  data,
  colors,
  labels,
  extraLabel = '',
  variant = 'bar',
  intl,
}) => {
  const defaultColors = [theme.colors.blue4, theme.colors.blue5, theme.colors.red1]

  const chartData = {
    labels,
    datasets: [{
      backgroundColor: colors || defaultColors.slice(0, data.length),
      data,

    }],
  }
  const options = {
    tooltips: {
      position: 'nearest',
      callbacks: {
        label: (item, data1) => ` ${labels[item.index].toString()}: ${FormatNumberESService
          .formatNumber(intl, data1.datasets[item.datasetIndex].data[item.index])}`,
        title: () => '',
      },
    },
  }
  return (
    <Card padding="25px">
      <ChartHeader translationKey={headerKey} ready={!_.isEmpty(data)} />
      {
        // eslint-disable-next-line no-nested-ternary
        _.isEmpty(data) ? (
          <StyledSkeleton variant="rect" />
        ) : (
          variant === 'doughnut' ? (
            <ChartContainer>
              <Doughnut
                data={chartData}
                options={options}
              />
              <Label>
                <Font variant="h3" component="span">
                  <b>{extraLabel}</b>
                </Font>
              </Label>
            </ChartContainer>
          ) : (
            <HorizontalBar
              options={{ legend: { display: false }, ...options }}
              data={chartData}
            />
          )
        )
      }
    </Card>
  )
}

export default injectIntl(Chart);
