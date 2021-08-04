import React from 'react';
import { keys } from 'lodash';
import { useDispatch } from 'react-redux';

import { ContainerCardRadio } from 'common/components/FlexContainer/CardContainer';
import GetSelector from 'rdx/newRedux/selectores/GetSelector';
import { KEY_GET_DOMAIN, KEY_GET_TOOLS, KEY_LOADING_GET_TOOLS } from 'rdx/newRedux/selectores/keys';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import dataApi from 'rdx/newRedux/api/dataApi';
import { GET_TOOLS } from 'rdx/newRedux/types';
import Action from 'rdx/newRedux/actions/Action';
import Font from 'common/components/Font';
import { FormattedMessage } from 'react-intl';
import Skeleton from '@material-ui/lab/Skeleton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Details from 'views/riskmatrix/tool/Details';
import Card from '@material-ui/core/Card';
import styles from 'views/riskmatrix/tool/styles';
import { EmptyMessage } from 'views/riskmatrix/Details/DetailsTable';
import Divider from '@material-ui/core/Divider';

const Tools = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('mx');
  const domain = GetSelector(KEY_GET_DOMAIN);
  const details = GetSelector(KEY_GET_TOOLS);
  const loading = GetSelector(KEY_LOADING_GET_TOOLS);
  React.useEffect(() => {
    if (domain) {
      const data = dataApi.getToolsData;
      const payload = {
        params: {
          domain,
        },
        ...data,
      }
      dispatch(Action(GET_TOOLS, payload));
    }
  }, [domain]);
  const handleChange = (event) => {
    setValue(event.target.name);
  };
  const items = details && keys(details).map((k) => (
    <FormControlLabel
      key={k}
      control={(
        <Checkbox
          name={k}
          checked={value === k || false}
          color="primary"
          onChange={handleChange}
        />
      )}
      label={<span> {k}</span>}
    />
  ));

  if (loading === true || loading === undefined) {
    return (
      <ContainerCardRadio>
        <Skeleton height={6} width="50%" />
        <Skeleton variant="rect" height={100} width="100%" />
      </ContainerCardRadio>
    )
  }
  return (
    <Card className={classes.root}>
      <Font variant="h3" component="h2">
        <FormattedMessage id="dmarc.tools" />
      </Font>
      {(!keys(details).includes('errorType') || details.length > 0) && items}
      {(!details || keys(details).includes('errorType')) && (
      <div>
        <Divider className={classes.divider} />
        <EmptyMessage><FormattedMessage id="not.have.data" /></EmptyMessage>
      </div>
      )}
      { details && !keys(details).includes('errorType') && <Details data={details} name={value} /> }
    </Card>
  );
};

export default withUserInfo(Tools);
