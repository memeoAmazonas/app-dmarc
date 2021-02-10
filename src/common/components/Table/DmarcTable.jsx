import React from 'react';
import {
  makeStyles, Table, TableContainer,
} from '@material-ui/core';
import { theme as th } from 'src/theme';

import HeadTable from './HeadTable';
import BodyTable from './BodyTable';

const useStyles = makeStyles((theme) => ({
  header: (props) => {
    if (props) {
      switch (props.classname) {
        case 'dark':
          return {
            backgroundColor: th.colors.grey3,
            color: th.colors.grey5,
          };
        default:
          return {}
      }
    }
    return {};
  },
  body: (props) => {
    if (props) {
      switch (props.classname) {
        case 'dark':
          return {
            backgroundColor: th.colors.blue1,
            color: th.colors.grey5,
          };
        default:
          return {}
      }
    }
    return {};
  },
}));
const DmarcTable = ({
  classname = 'dark', onClick, titles, details, formatData, orderByKey, asc,
}) => {
  const clasess = useStyles({ classname, ...th });
  return (
    <TableContainer style={{ maxWidth: 1280, maxHeight: 850 }}>
      <Table stickyHeader>
        <HeadTable
          orderByKey={orderByKey}
          asc={asc}
          classname={classname}
          onClick={onClick}
          titles={titles}
          clasess={clasess}
          details={details}
        />
        <BodyTable details={details} formatData={formatData} clasess={clasess} />
      </Table>
    </TableContainer>
  )
}

export default DmarcTable;
