import React from 'react';
import { injectIntl } from 'react-intl'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Card from 'common/components/Card';
import styled from 'styled-components';

const A11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});
const Container = styled(Card)`
width:100%;
display: flex;
justify-content: center;
`;
const TabPanel = ({
  titles, tabIndex, setTabIndex, intl,
}) => {
  const ref = React.useRef();
  const titlesTab = titles.map((item) => (
    <Tab
      key={item.label}
      label={intl.formatMessage({ id: item.label })}
      {...A11yProps(item.id)}
    />
  ));

  return (
    <Container ref={ref}>
      <Tabs
        value={tabIndex}
        onChange={(e, val) => setTabIndex(val)}
        indicatorColor="primary"
        textColor="primary"
        scrollButtons="auto"
        variant="scrollable"
      >
        { titlesTab }
      </Tabs>
    </Container>
  );
};

export default injectIntl(TabPanel);
