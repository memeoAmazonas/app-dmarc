import React from 'react';
import { orderBy, pick, keys } from 'lodash'
import { LABEL_REPORT_TABLE } from 'common/constants/tabsTitles';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import { FormattedMessage, injectIntl } from 'react-intl';
import countries from 'i18n-iso-countries';
import styled from 'styled-components';
import DmarcTable from 'common/components/Table/DmarcTable';
import MessageBox from 'common/components/MessageBox';
import { theme } from 'src/theme';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));

const TableCont = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
; `;
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

  // TODO cuando se necesite reverseDNS solo se debe enviar la funcion sin el pick
  const data = ((orderBy(details, [orderByKey], [asc]))).map((item) => pick(item, ['pais', 'ip', 'cont']));

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
  const _keys = keys(data[0]);


  const titles = [];
  LABEL_REPORT_TABLE.forEach((item) => {
    if (_keys.includes(item.key)) titles.push(item);
  })

  return (
    <React.Fragment>
      {data.length > 0 ? (
        <TableCont>
          <DmarcTable
            formatData={formatData}
            details={data || []}
            titles={titles}
            onClick={onOrderBy}
            classname="dark"
            orderByKey={orderByKey}
            asc={asc}
          />
        </TableCont>
      ) : (
        <MessageBox
          message={<b><FormattedMessage id="not.have.data" /></b>}
          variant="primary"
          rest={{ color: theme.colors.grey5, bg: theme.colors.blue1 }}
        />
      ) }
    </React.Fragment>

  );
};


export default injectIntl(TableDetail);
