import React from 'react';
import Container from 'common/components/FlexContainer/Container';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletoLoading = () => (
  <Container display="flex">
    <Container width="78%">
      <Container marginTop={64}>
        <Skeleton variant="rect" height={50} width="100%" />
      </Container>
      <Container marginTop={25}>
        <Skeleton variant="text" height={50} width="100%" />
        <Skeleton variant="text" height={20} width="100%" />
        <Skeleton variant="text" height={20} width="100%" />
        <Skeleton variant="text" height={20} width="100%" />
      </Container>
    </Container>
  </Container>
);

export default SkeletoLoading;
