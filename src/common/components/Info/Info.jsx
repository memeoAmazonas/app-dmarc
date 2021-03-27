import React from 'react';
import some from 'lodash/some';
import isNil from 'lodash/isNil';

import Card from 'common/components/Card';
import InfoContent from './InfoContent';
import InfoHeader from './InfoHeader';


const Info = ({
  data, padding = '0 0 15px 0', header = '', labels = [], setFormat = true,

}) => {
  return (
    <Card padding={padding}>
      <InfoHeader ready={!some(data, isNil)} header={header} />
      <InfoContent setFormat={setFormat} ready={!some(data, isNil)} data={data} labels={labels} />
    </Card>
  );
};

export default Info;
