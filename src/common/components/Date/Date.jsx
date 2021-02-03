import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components';


import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Button from 'common/components/Button';
import Card from 'common/components/Card';
import Font from 'common/components/Font';


const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const ButtonSection = styled.div`
  margin-top: 10px;
  margin-left: 20%;
  max-width: 70%;
`;


const Dates = ({ onSearch, intl }) => {
  // const filteringByCustomDate = useSelector(selectIsCustomFilterActive)
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  /*   React.useEffect(() => {
     if (!filteringByCustomDate) {
       setStartDate(null);
       setEndDate(null);
     }
   }, [filteringByCustomDate]);

   const fetchSummaryByDate = () => {
     const msg = null;
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
       setDisplay(-1)
     }
   } */

  return (
    <React.Fragment>
      <Card padding="20px">
        <Grid container>
          <ButtonSection />
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
              onClick={() => onSearch(startDate, endDate)}
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
export default injectIntl(Dates);
