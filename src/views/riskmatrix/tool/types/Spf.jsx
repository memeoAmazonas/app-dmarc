import React from 'react';
import { concat, keys } from 'lodash';
import { ExpandMore } from '@material-ui/icons';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import styles from 'views/riskmatrix/tool/styles';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { EmptyMessage } from 'views/riskmatrix/Details/DetailsTable';
import { FormattedMessage } from 'react-intl';

const Spf = ({ data }) => {
  const [list, setList] = React.useState();
  const classes = styles();
  React.useEffect(() => {
    if (!list) {
      const li = {};
      data.forEach((e) => {
        const act = keys(e);
        act.forEach((k) => {
          if (li[k]) {
            li[k] = concat(li[k], e[k])
          } else {
            li[k] = e[k]
          }
        })
      });
      setList(li);
    }
  }, [data]);

  const setContent = (el) => {
    if (typeof el === 'string') {
      if (el.length > 0) {
        return (
          <div className={classes.ListItemEven}>
            <span className={classes.mxItem}>{el}</span>
          </div>
        );
      }
      return null
    }
    const scroll = typeof el !== 'string' && el.length > 5 ? { overflowY: 'scroll', maxHeight: 150 } : { maxHeight: 150 }

    return (
      <div style={scroll}>{el.map((k, ik) => (
        <div key={k} className={ik % 2 ? classes.ListItemOdd : classes.ListItemEven}>
          <span className={classes.mxItem}>
            {k}
          </span>
        </div>
      ))}
      </div>
    )
  }


  const [exp, setExp] = React.useState();
  const onHandle = (i) => {
    if (i === exp) {
      setExp(null);
    } else {
      setExp(i)
    }
  }
  const styleScroll = keys(list).length > 6 ? { overflowY: 'scroll' } : {};
  if (list) {
    return (
      <div style={{ maxHeight: 400, ...styleScroll }}>
        {keys(list).map((i) => (
          <Accordion expanded={exp === i} onChange={() => onHandle(i)}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel-${i}`}
              id={i}
              key={i}
            >
              <Typography className={classes.heading}>{i}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetail}>
              {setContent(list[i])}
            </AccordionDetails>
          </Accordion>
        ))
          }

      </div>
    );
  }
  return <EmptyMessage><FormattedMessage id="not.have.data" /></EmptyMessage>
};

export default Spf;
