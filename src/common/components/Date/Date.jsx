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
import moment from 'moment';
import GetSelector from 'rdx/newRedux/selectores/GetSelector';
import { KEY_DISPLAY_SELECTED } from 'rdx/newRedux/selectores/keys';


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
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const diplaySelected = GetSelector(KEY_DISPLAY_SELECTED);
  React.useEffect(() => {
    if (diplaySelected !== -1) {
      setStartDate(null);
      setEndDate(null)
    }
  }, [diplaySelected])
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
              onClick={() => onSearch(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'))}
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
