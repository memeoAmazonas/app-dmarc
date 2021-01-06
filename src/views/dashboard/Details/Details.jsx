import React from 'react';
import _ from 'lodash';

import styled from 'styled-components';

import Table from '@material-ui/core/Table';
import Skeleton from '@material-ui/lab/Skeleton';

import Card from 'common/components/Card';
import DetailsHeader from './DetailsHeader';
import DetailsTableHead from './DetailsTableHead';
import DetailsTableBody from './DetailsTableBody';

const DetailsWrapper = styled(Card)`
  overflow-y: scroll;
  margin-top: 20px;
  h2 {
    padding: 15px;
    padding-bottom: 0;
  }
`;


const Details = ({ details }) => {
  return (
    <DetailsWrapper>
      {
        _.isEmpty(details) ? (
          <Skeleton variant="rect" height={200} width="100%" />
        ) : (
          <React.Fragment>
            <DetailsHeader />
            <Table>
              <DetailsTableHead />
              <DetailsTableBody details={details} />
            </Table>
          </React.Fragment>
        )
      }
    </DetailsWrapper>
  )
}

export default Details;
