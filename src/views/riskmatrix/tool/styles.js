import { makeStyles } from '@material-ui/core';
import { theme } from 'src/theme';

const equals = {
  alignItems: 'center',
  display: 'flex',
}

const styles = makeStyles((th) => ({
  ListItemOdd: {
    ...equals,
  },
  ListItemEven: {
    ...equals,
    backgroundColor: theme.colors.grey1,
  },
  content: {
    paddingBottom: 10,
  },
  mxItem: {
    fontSize: th.typography.pxToRem(15),
    padding: 8,
    wordBreak: 'break-all',
  },
  mxItemTitle: {
    fontSize: th.typography.pxToRem(16),
    padding: 8,
    fontWeight: th.typography.fontWeightBold,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.blue1,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    padding: 10,
  },
  heading: {
    fontSize: th.typography.pxToRem(18),
    color: theme.colors.blue6,
    fontWeight: th.typography.fontWeightLight,
  },
  root: {
    padding: 20,
  },
  accordionDetail: {
    display: 'block',
    padding: 5,
  },
}));
export default styles;
