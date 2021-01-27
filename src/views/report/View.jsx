import React from 'react';
import Layout from 'common/components/Layout';
import Grid from '@material-ui/core/Grid';
import { RangeSelector } from 'common/components/RangeSelector';
import styled from 'styled-components';

const RangeContainer = styled.div`
  margin-bottom: 10px;
`;
const View = () => {
  return (
    <Layout>
      <Grid container spacing={0}>
        <Grid item md={4} xs={12} />
        <RangeContainer>
          <RangeSelector />
        </RangeContainer>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} />
      </Grid>
    </Layout>
  );
};

export default View;
