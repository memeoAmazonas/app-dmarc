import React from 'react';
import countries from 'i18n-iso-countries';
import GetSelector from 'rdx/newRedux/selectores/GetSelector';
import { KEY_DISPLAY_SELECTED } from 'rdx/newRedux/selectores/keys';
import DmarcTable from 'common/components/Table/DmarcTable';
import { LABEL_REPORT_TABLE_FORENSIC } from 'common/constants/tabsTitles';
import MessageBox from 'common/components/MessageBox';
import { FormattedMessage, injectIntl } from 'react-intl';
import { theme } from 'src/theme';
import styled from 'styled-components';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import { orderBy } from 'lodash';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));

const TableCont = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
; `;
const TableDetail = ({ data, type = 'subject', intl }) => {
  const language = intl.locale === 'es' ? 'es' : 'en';
  const selected = GetSelector(KEY_DISPLAY_SELECTED);

  const [orderByKey, setOrderByKey] = React.useState('count');
  const [asc, setAsc] = React.useState('desc');
  const ToSend = selected && data && data[`type_${selected}`][type];
  const details = ((orderBy(ToSend, [orderByKey], [asc])))
  const formatData = {
    format: {
      count: (d) => FormatNumberESService.formatNumber(intl, d),
      pais: (code) => countries.getName(code, language) || code.toLowerCase(),
    },
    styles: {
      pais: {},
      ip: {},
      count: {},
    },
  };
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
      {
        details.length > 0 ? (
          <TableCont>
            <DmarcTable
              details={details || []}
              titles={LABEL_REPORT_TABLE_FORENSIC[type]}
              classname="dark"
              formatData={formatData}
              onClick={onOrderBy}
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
        )
      }
    </React.Fragment>
  );
};

export default injectIntl(TableDetail);
