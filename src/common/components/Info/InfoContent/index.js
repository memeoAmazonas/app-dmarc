import React from 'react';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import Skeleton from '@material-ui/lab/Skeleton';
import Font from 'common/components/Font';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1px;

`;

const Label = styled.div`
  width: 40%;
  padding: 5px 0;
  margin-right: 5px;

`;

const InfoContent = ({
  ready, labels, data, intl, setFormat = true,
}) => {
  const stNoLabels = labels.length > 0
    ? { marginLeft: 20, padding: '5px 0' }
    : { fontSize: 20, marginTop: 25, textAlign: 'center' }
  const content = ready
    ? data.map((dataVal, idx) => (
      <Wrapper
        key={uniqueId(`info-${dataVal}-`)}
        style={{ borderBottom: labels.length > 0 ? '1px solid #3E97E8' : 'none' }}
      >
        {labels.length > 0 && (
        <Label>
          <Font style={{
            fontSize: 16, paddingLeft: 10,
          }}
          >
            {labels[idx]}
          </Font>
        </Label>
        )}
        <Font component="div" style={{ flexGrow: 1, ...stNoLabels }}>
          <b>{setFormat ? dataVal : FormatNumberESService.formatNumber(intl, dataVal)}</b>
        </Font>
      </Wrapper>
    ))
    : <Skeleton variant="rect" height={85} width="100%" />
  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  )
}

export default injectIntl(InfoContent);
