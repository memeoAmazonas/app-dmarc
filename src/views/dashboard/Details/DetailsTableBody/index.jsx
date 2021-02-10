import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import { injectIntl } from 'react-intl'

import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import Font from 'common/components/Font';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';

const ShadedTableCell = styled(TableCell)((props) => (`
  background-color: ${props.dmarcvariant === 'dark' ? props.theme.colors.blue1 : 'inherit'};
  &.MuiTableCell-head, &.MuiTableCell-body {
    color: ${props.dmarcvariant === 'dark' ? props.theme.colors.grey5 : 'inherit'};
  }
`));

const BodyItem = ({ children, ...rest }) => {
  return (
    <ShadedTableCell {...rest}>
      <Font variant="h5" component="span">
        <b>{ children }</b>
      </Font>
    </ShadedTableCell>
  )
}

const DetailsTableBody = ({ intl, details }) => {
  return (
    <React.Fragment>
      <TableBody>
        {
          Object.keys(details).map((domainName) => (
            <TableRow key={_.uniqueId('dash-details')}>
              <BodyItem align="left">
                <Link
                  to={{
                    pathname: '/riskmatrix',
                    search: `?domain=${domainName}`,
                  }}
                >
                  {domainName}
                </Link>
              </BodyItem>
              <BodyItem align="center">
                {FormatNumberESService.formatNumber(intl, details[domainName].totalMessages)}
              </BodyItem>
              <BodyItem align="center">
                {FormatNumberESService.formatNumber(intl, details[domainName].dmarc.pass)}
              </BodyItem>
              <BodyItem align="center">
                {intl.formatNumber(details[domainName].getPercentage('dmarc', 'pass'), { style: 'percent', maximumFractionDigits: 2 })}
              </BodyItem>
              <BodyItem dmarcvariant="dark" align="center">
                {FormatNumberESService.formatNumber(intl, details[domainName].authorized.pass)}
              </BodyItem>
              <BodyItem dmarcvariant="dark" align="center">
                {intl.formatNumber(details[domainName].getPercentage('authorized', 'pass'), { style: 'percent', maximumFractionDigits: 2 })}
              </BodyItem>
              <BodyItem dmarcvariant="dark" align="center">
                {FormatNumberESService.formatNumber(intl, details[domainName].authenticated.pass)}
              </BodyItem>
              <BodyItem dmarcvariant="dark" align="center">
                {intl.formatNumber(details[domainName].getPercentage('authenticated', 'pass'), { style: 'percent', maximumFractionDigits: 2 })}
              </BodyItem>
            </TableRow>
          ))
        }
      </TableBody>
    </React.Fragment>
  )
}

export default injectIntl(DetailsTableBody);
