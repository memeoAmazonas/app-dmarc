import React from 'react';
import Histogram from 'common/components/Histogram/Histogram';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Font from 'common/components/Font';
import { theme } from 'src/theme';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(() => ({
  button: {
    height: 30,
  },
  content: {
    marginBottom: 100,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    boxShadow: '0px 4px 10px -2px rgb(0 0 0 / 6%), 0px 4px 10px -2px rgb(0 0 0 / 6%), 0px 4px 10px -2px rgb(0 0 0 / 6%)',
  },
}));
const Details = ({
  intl, details, label, range,
}) => {
  const [init, setInit] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const clasess = useStyles();

  const size = details.length;
  const moveLeft = () => {
    if ((init - range) >= 0) {
      setInit(init - range);
      setEnd(end - range);
    } else {
      setInit(0);
      setEnd(range)
    }
  }
  const moveRight = () => {
    if (size >= (end + range)) {
      setInit(init + range);
      setEnd(end + range)
    } else {
      setEnd(size)
      setInit(size - range);
    }
  }
  React.useEffect(() => {
    setInit(0);
    setEnd(range);
  }, [range]);
  return (
    <div className={clasess.content}>
      <Tooltip
        title={(
          <React.Fragment>
            <div className={clasess.popper}>
              <Font
                variant="h1"
                component="span"
                style={{
                  fontSize: 16,
                  color: theme.colors.grey5,
                }}
              >
                <b><FormattedMessage id="histogram.move.left" /></b>
              </Font>
            </div>
          </React.Fragment>
        )
        }
        placement="top"
      >
        <IconButton
          className={clasess.button}
          color={init > 0 ? 'primary' : 'secondary'}
          aria-label="move-left"
          component="span"
          disabled={!(init > 0)}
          onClick={moveLeft}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Tooltip>
      <Histogram
        intl={intl}
        data={details.slice(init, end)}
        label={label}
      />
      <Tooltip
        title={(
          <React.Fragment>
            <div className={clasess.popper}>
              <Font
                variant="h1"
                component="span"
                style={{
                  fontSize: 16,
                  color: theme.colors.grey5,
                }}
              >
                <b><FormattedMessage id="histogram.move.right" /></b>
              </Font>
            </div>
          </React.Fragment>
        )
        }
        placement="top"
      >
        <IconButton
          color="primary"
          className={clasess.button}
          aria-label="move-right"
          component="span"
          disabled={!(details.length > end)}
          onClick={moveRight}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default Details;
