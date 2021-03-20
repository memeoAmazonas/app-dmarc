import React from 'react';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import Skeleton from '@material-ui/lab/Skeleton';
import Font from 'common/components/Font';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';


const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: flex-end;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding: 15px;
`;

const Label = styled.header`
  margin-bottom: 10px;
  max-width: 100px;
`;

const InfoContent = ({
  ready, labels, data, intl, setFormat = true,
}) => {
  return (
    <React.Fragment>
      {
        ready ? (
          <Wrapper>
            {
              data.map((dataVal, idx) => (
                <div key={uniqueId(`info-${dataVal}-`)}>
                  <Label>
                    <Font variant="body2" component="h3">
                      {labels[idx]}
                    </Font>
                  </Label>
                  <Font variant="h3" component="div" style={{margin: 10}}>
                    <b>{setFormat ? dataVal : FormatNumberESService.formatNumber(intl, dataVal)}</b>
                  </Font>
                </div>
              ))
            }
          </Wrapper>
        ) : (
          <Skeleton variant="rect" height={85} width="100%" />
        )
      }
    </React.Fragment>
  )
}

export default injectIntl(InfoContent);
