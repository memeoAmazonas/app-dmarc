import React, { useState, useRef, useEffect } from 'react';
import { injectIntl } from 'react-intl'
import _ from 'lodash';
import { connect } from 'react-redux'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Scroll } from 'common/utils/services/scroll.service'
import { recordItemsSelector, matrixFilterSelector } from 'rdx/records/selectors';
import Card from 'common/components/Card';
import TabPanel from './TabPanel';
import { TableVariants } from './DetailsTable'
import { DetailsTable } from './DetailsTable/DetailsTable'


const A11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const RecordsDetails = ({ records = [], matrixFilter, intl }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const detailsRef = useRef()

  useEffect(() => {
    if (records.length && !_.isNil(matrixFilter)) Scroll.scrollToRef(detailsRef)
  }, [records])


  if (_.isEmpty(records) || _.isNil(matrixFilter)) return null

  return (
    <Card ref={detailsRef}>
      <Tabs
        value={tabIndex}
        onChange={(e, val) => setTabIndex(val)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={intl.formatMessage({ id: 'risk.matrix.table.senders' })}
          {...A11yProps(0)}
        />
        <Tab
          label={intl.formatMessage({ id: 'risk.matrix.table.byip' })}
          {...A11yProps(1)}
        />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        {
            tabIndex === 0 && (
              <DetailsTable intl={intl} records={records} variant={TableVariants.SENDER} />
            )
          }
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {
            tabIndex === 1 && (
              <DetailsTable intl={intl} records={records} variant={TableVariants.IP} />
            )
          }
      </TabPanel>
    </Card>
  )
}


const mapStateToProps = (state) => ({
  records: recordItemsSelector(state),
  matrixFilter: matrixFilterSelector(state),
})

export default injectIntl(connect(
  mapStateToProps
)(RecordsDetails));
