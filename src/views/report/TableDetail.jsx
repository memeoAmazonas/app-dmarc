import React from 'react';
import { orderBy } from 'lodash'
import { LABEL_REPORT_TABLE } from 'common/constants/tabsTitles';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import { injectIntl } from 'react-intl';
import countries from 'i18n-iso-countries';
import styled from 'styled-components';
import DmarcTable from 'common/components/Table/DmarcTable';


countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));

const TableCont = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
 `;
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
      },
      ip: {
      },
      reverseDNS: {
      },
      cont: {
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
    <TableCont>
      <DmarcTable
        formatData={formatData}
        details={data}
        titles={LABEL_REPORT_TABLE}
        onClick={onOrderBy}
        classname="dark"
        orderByKey={orderByKey}
        asc={asc}
      />
    </TableCont>
  );
};


export default injectIntl(TableDetail);
