import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Skeleton from '@material-ui/lab/Skeleton';

import { Scroll } from 'common/utils/services/scroll.service'
import Button from 'common/components/Button';
import Font from 'common/components/Font';
import { selectDisplay } from 'rdx/summary/actions'
import { resetRecords } from 'rdx/records/actions'
import { showFilterResetSelector } from 'rdx/summary/selectors'
import { DEFAULT_DISPLAY } from 'common/constants'


const Container = styled.div`
  display:  flex;
  align-items: center;
  margin-bottom: 25px;
`;

const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    padding: 0 8px;
  }
`;

const FilterToggle = ({
  ready, setDisplay, resetRecordState, showReset
}) => {
  const resetFilters = () => {
    setDisplay(DEFAULT_DISPLAY);
    resetRecordState();
    Scroll.scrollTop();
  }

  return (
    <Container>
      {
      ready ? (
        <Font variant="h5" component="h2">
          <FormattedMessage id="risk.dashboard.date.filters" />
        </Font>
      ) : <Skeleton height={6} width="30%" />
    }
      {
      showReset ? (
        <StyledButton
          onClick={resetFilters}
          size="small"
          variant="contained"
          dmarcvariant="link"
        >
          <FormattedMessage id="risk.dashboard.filters.reset" />
        </StyledButton>
      ) : (null)
    }
    </Container>
  );
};

const mapStateToProps = (state) => ({
  showReset: showFilterResetSelector(state),
})

const mapDispatchToProps = {
  setDisplay: selectDisplay,
  resetRecordState: resetRecords,
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterToggle);
