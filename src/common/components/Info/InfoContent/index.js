import React from 'react';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import Skeleton from '@material-ui/lab/Skeleton';
import Font from 'common/components/Font';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';


const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;

`;

const Label = styled.header`
  max-width: 40%;
`;

const InfoContent = ({
  ready, labels, data, intl, setFormat = true,
}) => {
  return (
    <React.Fragment>
      {
        ready ? (
          <div>
            {
              data.map((dataVal, idx) => (
                <Wrapper key={uniqueId(`info-${dataVal}-`)}>
                  <Label>
                    <Font style={{ fontSize: 16, background: '#3E97E8', paddingLeft: 10, color: '#fff', opacity: 0.8, }}>
                      {labels[idx]}
                    </Font>
                  </Label>
                  <Font variant="h3" component="div" style={{ margin: 10 }}>
                    <b>{setFormat ? dataVal : FormatNumberESService.formatNumber(intl, dataVal)}</b>
                  </Font>
                </Wrapper>
              ))
            }
          </div>
        ) : (
          <Skeleton variant="rect" height={85} width="100%" />
        )
      }
    </React.Fragment>
  )
  // background: '#3E97E8', padding: 6, fontWeight: 'bold', opacity: '0.8',
}

export default injectIntl(InfoContent);
