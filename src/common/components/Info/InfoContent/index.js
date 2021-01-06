import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import Skeleton from '@material-ui/lab/Skeleton';
import Font from 'common/components/Font';


const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: flex-end;
  justify-content: space-around;
`;

const Label = styled.header`
  margin-bottom: 10px;
  max-width: 100px;
`;

const InfoContent = ({ ready, labels, data }) => {
  return (
    <React.Fragment>
      {
        ready ? (
          <Wrapper>
            {
              data.map((dataVal, idx) => (
                <div key={_.uniqueId(`info-${dataVal}-`)}>
                  <Label>
                    <Font variant="body2" component="h3">
                      {labels[idx]}
                    </Font>
                  </Label>
                  <Font variant="h3" component="div">
                    <b>{dataVal}</b>
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

export default InfoContent;
