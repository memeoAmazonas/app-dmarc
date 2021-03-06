import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectIntl, FormattedMessage } from 'react-intl';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Font from 'common/components/Font'
import { selectDisplay } from 'rdx/summary/actions'
import { displaySelector } from 'rdx/summary/selectors'
import { DEFAULT_DISPLAY } from 'common/constants/constants'
import { resetRecords } from 'rdx/records/actions'
import { RangeSelectorContainer } from 'common/components/FlexContainer/CardContainer';


const Header = styled.div`
  margin-bottom: 10px;
`;

const Component = ({
  selected, resetRecordState, intl, selectDisplay: select, onSelect = () => null,
}) => {
  const RANGES = [1, 7, 14, 30, 90]

  useEffect(() => {
    // On load of this component set the display to default
    select(DEFAULT_DISPLAY)
  }, [])

  const setDisplay = (event) => {
    resetRecordState();
    select(Number(event.target.value));
    onSelect();
  }

  return (
    <RangeSelectorContainer padding="25px">
      <Header>
        <Font variant="h3" component="h1">
          <FormattedMessage id="common.dashboard.filter.date" />
        </Font>
      </Header>
      <div>
        <RadioGroup
          aria-label="domains"
          name="domains"
          value={selected}
          onChange={setDisplay}
          row
        >
          <div>
            {
              RANGES.map((val) => (
                <FormControlLabel
                  key={val}
                  value={val}
                  control={<Radio color="primary" />}
                  label={val}
                />
              ))
            }
          </div>
          <FormControlLabel
            disabled
            key={-1}
            value={-1}
            control={<Radio color="primary" />}
            label={intl.formatMessage({ id: 'common.dashboard.custom' })}
          />
        </RadioGroup>
      </div>
    </RangeSelectorContainer>
  )
}

const mapStateToProps = (state) => ({
  selected: displaySelector(state),
})
const mapDispatchToProps = {
  selectDisplay,
  resetRecordState: resetRecords,
}
export const RangeSelector = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Component))
