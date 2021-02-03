import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components';


import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { asyncActions, actions } from 'rdx/records/actions';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import { currentDomainSelector, selectIsCustomFilterActive } from 'rdx/summary/selectors';
import { selectDisplay } from 'rdx/summary/actions'

import Button from 'common/components/Button';
import Card from 'common/components/Card';
import Font from 'common/components/Font';
import MessageBox from 'common/components/MessageBox'


const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const ButtonSection = styled.div`
  margin-top: 10px;
  margin-left: 20%;
  max-width: 70%;
`;


const Dates = ({
  loadRecords, intl, domain,
  customerTable, customerId, setDisplay, setDate,
  resetRecords,
}) => {
  const filteringByCustomDate = useSelector(selectIsCustomFilterActive)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState()

  useEffect(() => {
    if (!filteringByCustomDate) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [filteringByCustomDate]);

  const checkErrors = () => {
    let msg;
    if (!startDate || !endDate) {
      msg = 'Must select a start and end date'
    }

    const start = moment(startDate)
    const end = moment(endDate)
    if (end < start) {
      msg = 'End date must be greater than start date'
    }

    const today = moment()
    if (start > today || endDate > today) {
      msg = 'Start or end date are greater than today'
    }

    setError(msg)
    return msg
  }

  const fetchSummaryByDate = () => {
    const msg = checkErrors()
    if (!msg) {
      resetRecords();
      const start = moment(startDate).format('YYYY-MM-DD');
      const end = moment(endDate).format('YYYY-MM-DD');

      setDate({ start, end })
      loadRecords({
        requestObject: {
          domain,
          id: customerId,
          table: customerTable,
          startDate: start,
          endDate: end,
        },
      })
      // setStartDate(null)
      // setEndDate(null)
      setDisplay(-1)
    }
  }

  return (
    <React.Fragment>
      <Card padding="20px">
        <Grid container>
          <ButtonSection>
            <MessageBox message={error} />
          </ButtonSection>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CenteredGrid item md={12} xs={12}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                format="MM/dd/yyyy"
                placeholder="MM/dd/yyyy"
                margin="normal"
                id="date-picker-after"
                label={intl.formatMessage({ id: 'risk.dashboard.date.after' })}
                value={startDate}
                maxDate={new Date()}
                onChange={(date) => { setStartDate(date); setEndDate(null) }}
              />
            </CenteredGrid>
            <CenteredGrid item md={12} xs={12}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                placeholder="MM/dd/yyyy"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-before"
                label={intl.formatMessage({ id: 'risk.dashboard.date.before' })}
                value={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                maxDate={new Date()}
                disabled={!startDate}
              />
            </CenteredGrid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <ButtonSection>
            <Button
              onClick={fetchSummaryByDate}
              disabled={!startDate || !endDate}
            >
              <Font variant="h5" component="span">
                <FormattedMessage id="risk.dashboard.date.search" />
              </Font>
            </Button>
          </ButtonSection>
        </Grid>
      </Card>
    </React.Fragment>
  )
};

const mapDispatchToProps = {
  loadRecords: asyncActions.loadAction,
  setDisplay: selectDisplay,
  setDate: actions.setDateFilter,
  resetRecords: actions.resetRecords,
}

const mapStateToProps = (state) => ({
  domain: currentDomainSelector(state),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withUserInfo(Dates)));
