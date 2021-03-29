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
  border-bottom: 1px solid #3E97E8;
`;

const Label = styled.div`
  width: 40%;
  padding: 5px 0;
  margin-right: 5px;

`;

const InfoContent = ({
  ready, labels, data, intl, setFormat = true,
}) => {
  const content = ready
    ? data.map((dataVal, idx) => (
      <Wrapper key={uniqueId(`info-${dataVal}-`)}>
        <Label>
          <Font style={{
            fontSize: 16, paddingLeft: 10,
          }}
          >
            {labels[idx]}
          </Font>
        </Label>
        <Font component="div" style={{ padding: '5px 0', marginLeft: 20, flexGrow: 1 }}>
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
  // background: '#3E97E8', padding: 6, fontWeight: 'bold', opacity: '0.8',
}

export default injectIntl(InfoContent);
