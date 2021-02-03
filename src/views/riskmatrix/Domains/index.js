import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import styled from 'styled-components';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormattedMessage } from 'react-intl'
import Skeleton from '@material-ui/lab/Skeleton';

import { Scroll } from 'common/utils/services/scroll.service'
import { selectDomain, selectDisplay } from 'rdx/summary/actions'
import { resetRecords } from 'rdx/records/actions';
import { currentDomainSelector, domainsSelector } from 'rdx/summary/selectors';
import Font from 'common/components/Font';
import Card from 'common/components/Card';
import { DEFAULT_DISPLAY } from 'common/constants/constants'


const StyledCard = styled(Card)`
  padding: 20px;
  max-height: 300px;
`;

const DomainList = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  max-width: 300px;
  text-decoration: none;
  padding-left: 10px;
`;


const Domains = ({
  domains, domain, setDomain, history, location,
  setDisplay, resetRecordState, type = 'riskmatrix',
}) => {
  const locationRegex = location.search.match(/domain=([^&]*)/);
  const domainNames = Object.keys(domains)
  const selectedDomain = domain || domainNames[0]

  const handleDomainChange = (event) => {
    setDomain(event.target.value)
    resetRecordState();
    setDisplay(DEFAULT_DISPLAY)
    history.push(`/${type}?domain=${event.target.value}`);
    Scroll.scrollTop();
  };
  React.useEffect(() => {
    if (locationRegex) {
      setDomain(locationRegex[1]);
    } else {
      setDomain(domainNames[0]);
      history.push(`/${type}?domain=${domainNames[0]}`);
    }
  }, [])

  return (
    <StyledCard>
      {
        domainNames.length > 0 ? (
          <React.Fragment>
            <Font variant="h3" component="h2">
              <FormattedMessage id="dashboard.summary.header" values={{ count: domainNames.length }} />
            </Font>
            <DomainList>
              <RadioGroup
                aria-label="domains"
                name="domains"
                value={selectedDomain}
                onChange={handleDomainChange}
              >
                {
                  domainNames.map((dom) => (
                    <FormControlLabel
                      key={dom}
                      value={dom}
                      control={<Radio color="primary" />}
                      label={dom}
                    />
                  ))
                }
              </RadioGroup>
            </DomainList>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Skeleton height={6} width="50%" />
            <Skeleton variant="rect" height={100} width="100%" />
          </React.Fragment>
        )
      }
    </StyledCard>
  );
};

const mapDispatchToProps = {
  setDomain: selectDomain,
  setDisplay: selectDisplay,
  resetRecordState: resetRecords,
}
const mapStateToProps = (state) => ({
  domains: domainsSelector(state),
  domain: currentDomainSelector(state),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(
  withRouter(Domains)
);
