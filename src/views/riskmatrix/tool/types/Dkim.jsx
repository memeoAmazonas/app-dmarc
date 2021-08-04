import React from 'react';
import { keys } from 'lodash';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { ExpandMore } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import styles from 'views/riskmatrix/tool/styles';
import { FormattedMessage } from 'react-intl';
import { EmptyMessage } from 'views/riskmatrix/Details/DetailsTable';

const Dkim = ({ data }) => {
  const classes = styles();
  const [exp, setExp] = React.useState();
  const setContent = (i) => {
    const act = i[keys(i)[0]];
    if (!act.length > 0) return null;
    const scroll = act.length > 2 ? { overflowY: 'scroll', maxHeight: 150 } : { maxHeight: 150 }
    return (
      <div style={scroll}>{act.map((k, ik) => {
        return (
          keys(k).map((l) => {
            return (
              <div key={l} className={ik % 2 ? classes.ListItemOdd : classes.ListItemEven}>
                <span className={classes.mxItemTitle}>
                  {l}
                </span>
                <span className={classes.mxItem}>
                  {k[l]}
                </span>
              </div>
            )
          })
        );
      })}
      </div>
    )
  }
  const onHandle = (i) => {
    if (i === exp) {
      setExp(null);
    } else {
      setExp(i)
    }
  }
  const styleScroll = keys(data).length > 2 ? { overflowY: 'scroll' } : {};
  if (keys(data).length > 0) {
    return (
      <div style={{ maxHeight: 400, ...styleScroll }}>
        {data.map((i) => (
          <Accordion expanded={exp === keys(i)[0]} onChange={() => onHandle(keys(i)[0])}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel-${keys(i)[0]}`}
              id={keys(i)[0]}
              key={keys(i)[0]}
            >
              <Typography className={classes.heading}>{keys(i)[0]}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetail}>
              {setContent(i)}
            </AccordionDetails>
          </Accordion>
        ))
        }

      </div>


    );
  }
  return <EmptyMessage><FormattedMessage id="not.have.data" /></EmptyMessage>
};

export default Dkim;
