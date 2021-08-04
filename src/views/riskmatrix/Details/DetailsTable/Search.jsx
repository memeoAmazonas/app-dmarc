import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SearchIcon from '@material-ui/icons/Search';
import { FormattedMessage } from 'react-intl';
import { theme } from 'src/theme';
import Divider from '@material-ui/core/Divider';

const cl = makeStyles((th) => ({
  content: {
    display: ' flex',
    justifyContent: 'flex-end',
    paddingRight: 35,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
  },
  input: {
    marginLeft: th.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = ({ value = '', onSearch = null, exist }) => {
  const classes = cl();
  // const [val, setVal] = React.useState('');
  const onChange = (e) => {
    if (e.charAt(0) !== '.') {
      const parst = e.split('.');
      let isFine = true;
      parst.forEach((k) => {
        if (k > 255 || k.length > 3) {
          isFine = false;
        }
      })
      if (isFine && parst.length <= 4) {
        if (e.charAt(e.length - 1) === '.' && e.charAt(e.length - 2) === '.') {
          onSearch(e.slice(0, -1))
        } else {
          onSearch(e.replace(/[^0-9.]/g, ''));
        }
      }
    }
  }
  const htmlColor = () => {
    if (value) {
      return !exist ? theme.colors.blue1 : theme.colors.grey6
    }
    return theme.colors.grey6;
  }
  return (
    <div>
      <div className={classes.content}>
        <Paper elevation={4} className={classes.root}>
          <FormattedMessage id="search.ip">
            {(placeholder) => (
              <InputBase
                className={classes.input}
                placeholder={placeholder}
                inputProps={{
                  'aria-label': 'search google maps',
                }}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          </FormattedMessage>
          <IconButton type="submit" className={classes.iconButton} aria-label="search" disabled>
            <SearchIcon htmlColor={htmlColor()} />
          </IconButton>
          {
            value && (
              <React.Fragment>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={classes.iconButton} aria-label="search" onClick={() => onChange('')}>
                  <DeleteForeverIcon htmlColor={theme.colors.red1} />
                </IconButton>
              </React.Fragment>
            )
          }
        </Paper>
      </div>
    </div>
  );
};

export default Search;
