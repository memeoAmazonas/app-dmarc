import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { asyncActions, actions } from 'rdx/records/actions';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import { STATUS } from 'common/constants/constants';
import Card from 'common/components/Card';
import { dateFilterSelector, matrixFilterSelector } from 'rdx/records/selectors';
import { currentDomainSelector, displaySelector } from 'rdx/summary/selectors';
import { getMatrixPositionForApi } from 'rdx/records/parsers'
import Skeleton from '@material-ui/lab/Skeleton';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import CellButton from './CellButton';


const MatrixWrapper = styled(Card)`
  display: flex;
  justify-content: center;
`;
const Matrix = ({
  state, customerTable, domain, loadRecords,
  display, customerId, setMatrixFilter, dateFilter,
  matrixFilter, intl,
}) => {
  const weights = [1, 0, -1];
  const status = [STATUS.pass, STATUS.neutral, STATUS.fail];
  const isFilteringMatrix = useSelector(matrixFilterSelector)
  const [displayState, setDisplayState] = useState()

  useEffect(() => {
    // We don't want to change the display state of the matrix when we are filtering
    // using the matrix by clicking on the buttons
    if (!isFilteringMatrix) {
      setDisplayState(state)
    }
  }, [state, isFilteringMatrix])

  const onCellClick = (attrName?: string, amount?: number) => {
    if (attrName && amount) {
      const position = getMatrixPositionForApi(attrName)
      const dates = { ...dateFilter };
      setMatrixFilter(attrName);
      loadRecords({
        requestObject: {
          domain,
          id: customerId,
          table: customerTable,
          matrix: position,
          type: _.isNil(dateFilter) ? display : 0,
          startDate: dates.start,
          endDate: dates.end,
        },
      })
    }
  }

  const buildDefinition = () => {
    // [[{ label: 'pass'}, { label: 'neutral'}, {label: 'fail'}]]
    const matrixHeaders = status.map((statusList) => ({
      label: intl.formatMessage({ id: `risk.matrix.header.${statusList[0]}` }),
      x: 'header',
    }));
    const matrix = [matrixHeaders];

    for (let i = 0; i < status.length; i += 1) {
      const row = [];
      for (let j = 0; j < status.length; j += 1) {
        // Build the rows by comparing x vs y
        const attrName = `${status[i][0]}${status[j][0]}`;
        const cellMetaData = {
          attrName,
          label: _.get(displayState, `${status[i][0]}${status[j][0]}`, 0),
          x: status[i], // ["pass"]
          y: status[j], // ["neutral", "none"]
          weight: (weights[i] + weights[j]),
        }
        row.push(cellMetaData);
      }
      matrix.push(row);
    }

    // Add the left side headers
    matrix[0].unshift({ label: 'DKIM vs SPF', x: 'header' });
    for (let i = 0; i < status.length; i += 1) {
      matrix[i + 1].unshift({
        label: intl.formatMessage({ id: `risk.matrix.header.${status[i][0]}` }),
        x: 'header',
      })
    }

    return matrix;
  }
  const [minWidth, setMinWidth] = React.useState(90);
  const [act, setAct] = React.useState(0);
  const calculeValue = (value) => {
    if (value.toString().length > act) {
      setAct(value.toString().length);
      if (value.toString().length > 8) {
        setMinWidth((value.toString().length * 10) + 20);
      }
    }
  };
  const renderMatrix = () => {
    const definition = buildDefinition();
    // Create the matrix rows
    const getRow = (rowIdx) => {
      const items = [];
      for (let i = 0; i < definition.length; i += 1) {
        const cellMetadata = definition[rowIdx][i];
        const isHeader = cellMetadata.x === 'header';
        const valueCell = FormatNumberESService.formatNumber(intl, cellMetadata.label);

        calculeValue(valueCell);
        items.push(
          <CellButton
            meta={{
              isHeader,
              status: cellMetadata.weight,
              selected: matrixFilter === cellMetadata.attrName,
              minWidth: `${minWidth}px`,
            }}
            onClick={onCellClick.bind(this, cellMetadata.attrName, Number(cellMetadata.label))}
            disableRipple={!cellMetadata.x}
            key={_.uniqueId(`matrix-cel-${rowIdx}-${i}`)}
            label={isHeader ? cellMetadata.label : valueCell}
          />
        )
      }
      return items;
    }

    // Create the matrix Colums
    const getColumns = () => {
      const items = []
      for (let i = 0; i < definition.length; i += 1) {
        items.push(
          <Grid item xs={12} key={_.uniqueId(`matrix-row-${i}`)}>
            {getRow(i)}
          </Grid>
        )
      }
      return items;
    }

    return getColumns().map((row) => (
      <React.Fragment key={_.uniqueId('matrix-fragment-')}>
        {row}
      </React.Fragment>
    ))
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MatrixWrapper padding="40px">
          {_.isEmpty(displayState)
            ? (<Skeleton variant="rect" height={200} width="100%" />)
            : (<div>{renderMatrix()}</div>)}
        </MatrixWrapper>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = {
  loadRecords: asyncActions.loadAction,
  setMatrixFilter: actions.setMatrixFilter,
}
const mapStateToProps = (state) => ({
  domain: currentDomainSelector(state),
  display: displaySelector(state),
  dateFilter: dateFilterSelector(state),
  matrixFilter: matrixFilterSelector(state),
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withUserInfo(Matrix)));
