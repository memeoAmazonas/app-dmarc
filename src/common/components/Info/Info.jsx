import React from 'react';
import _ from 'lodash';

import Card from 'common/components/Card';
import InfoContent from './InfoContent';
import InfoHeader from './InfoHeader';


const Info = ({
  data, padding = '15px', header = '', labels = [],
}) => {
  return (
    <Card padding={padding}>
      <InfoHeader ready={!_.some(data, _.isNil)} header={header} />
      <InfoContent ready={!_.some(data, _.isNil)} data={data} labels={labels} />
    </Card>
  );
};

export default Info;
