import React from 'react';
import { orderBy } from 'lodash'
import TableHeader from 'common/components/Table/TableHeader';
import { LABEL_REPORT_TABLE } from 'common/constants/tabsTitles';
import Table from '@material-ui/core/Table';
import BodyTable from 'common/components/Table/BodyTable';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import { FormattedMessage, injectIntl } from 'react-intl';
import countries from 'i18n-iso-countries';
import TableContainer from '@material-ui/core/TableContainer';
import MessageBox from 'common/components/MessageBox';
import { theme } from 'src/theme';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));

const TableDetail = ({ details, intl }) => {
  const language = intl.locale === 'es' ? 'es' : 'en';
  const [orderByKey, setOrderByKey] = React.useState('cont');
  const [asc, setAsc] = React.useState('desc');

  const formatData = {
    format: {
      cont: (data) => FormatNumberESService.formatNumber(intl, data),
      pais: (code) => countries.getName(code, language) || code.toLowerCase(),
    },
    styles: {
      pais: {
        width: '20%',
        border: '2px solid red',
      },
      ip: {
        width: '20%',
      },
      reverseDNS: {
        width: '35%',
      },
    },
  };
  const data = (orderBy(details, [orderByKey], [asc]));
  const onOrderBy = (key) => {
    if (key !== orderByKey) {
      setOrderByKey(key);
    }
    if (asc === 'asc') {
      setAsc('desc');
    } else {
      setAsc('asc');
    }
  }
  return (
    <React.Fragment>
      <Table>
        <TableHeader titles={LABEL_REPORT_TABLE} type="dark" onClick={onOrderBy} />
      </Table>
      { details && details.length > 0
        ? (
          <TableContainer style={{ height: 800 }}>
            <Table>
              <BodyTable details={data} type="dark" formatData={formatData} />
            </Table>
          </TableContainer>
        ) : (
          <MessageBox variant="success" rest={{ bg: theme.colors.blue1, color: 'white' }} message={<FormattedMessage id="not.have.data" />} />
        )
        }
    </React.Fragment>
  );
};


export default injectIntl(TableDetail);
