import React from 'react';
import {
  uniqueId, keys, filter as fil, isEmpty,
} from 'lodash'
import { FormattedMessage, FormattedNumber } from 'react-intl'

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Font from 'common/components/Font';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import {
  TableVariants, FormattingOptions, Item, RowWrapper, EmptyMessage,
} from './index'

export const DetailsSubTable = ({
  variant, summary, filter, intl,
}) => {
  const [details, setDetails] = React.useState();
  const [act, setAct] = React.useState();
  React.useEffect(() => {
    if (!act) {
      if (variant === TableVariants.SENDER) {
        setAct(summary.recordsSummaryByIp());
      } else {
        setAct(summary.recordsByCombinations());
      }
    }
  });
  React.useEffect(() => {
    if (!details && filter && act) setDetails(fil(act, (k) => keys(k)[0].includes(filter)));
    if (!details && act && !filter) setDetails(act);
  }, [act]);
  React.useEffect(() => {
    if (filter && act) {
      setDetails(fil(act, (k) => keys(k)[0].includes(filter)));
    } else if (!filter) {
      setDetails(act);
    }
  }, [filter]);
  if (!details) return null
  const Row = ({ index, style }) => {
    const odd = index % 2 !== 0
    const ipDetail = details[index]
    return (
      <RowWrapper odd={odd} style={style}>
        {
          <Item align="center">
            <b>{Object.keys(ipDetail)[0]}</b>
          </Item>
        }
        {
          Object.values(ipDetail)[0].map((detail) => (
            <React.Fragment key={uniqueId(`${Object.keys(ipDetail)[0]}-ip-details-`)}>

              <Item align="center">
                <Font variant="h5" component="span">
                  <FormattedNumber
                    value={detail.dmarcAlignmentPassPerc}
                    {...FormattingOptions}
                  />
                </Font>
              </Item>

              <Item align="center">
                <Font variant="h5" component="span">
                  <FormattedNumber
                    value={detail.spfPassPerc}
                    {...FormattingOptions}
                  />
                </Font>
              </Item>
              <Item align="center">
                <Font variant="h5" component="span">
                  <FormattedNumber
                    value={detail.spfAlignmentPassPerc}
                    {...FormattingOptions}
                  />
                </Font>
              </Item>
              <Item align="center">
                <Font variant="h5" component="span">
                  <FormattedNumber
                    value={detail.dkimPassPerc}
                    {...FormattingOptions}
                  />
                </Font>
              </Item>
              <Item align="center">
                <Font variant="h5" component="span">
                  <FormattedNumber
                    value={detail.dkimAlignmentPassPerc}
                    {...FormattingOptions}
                  />
                </Font>
              </Item>
              {
                variant === TableVariants.SENDER ? (
                  <Item>{detail.ips}</Item>
                ) : null
              }
              <Item align="center">{FormatNumberESService.formatNumber(intl, detail.recordsMessages)}</Item>
              {
                variant === TableVariants.IP && (
                  <React.Fragment>
                    <Item>
                      <Font variant="h5" component="span">
                        {detail.records[0].RecordIdentifiersEnvelopeFrom}
                      </Font>
                    </Item>
                    <Item>
                      <Font variant="h5" component="span">
                        {detail.records[0].RecordIdentifiersHeadersFrom}
                      </Font>
                    </Item>
                    <Item>
                      <Font variant="h5" component="span">
                        {detail.records[0].RecordAuthResultsDkmiDomain}
                      </Font>
                    </Item>
                  </React.Fragment>
                )
              }
            </React.Fragment>
          ))
        }
      </RowWrapper>
    )
  }
  if (isEmpty(details)) return <EmptyMessage><FormattedMessage id="not.have.data" /></EmptyMessage>

  return (
    <React.Fragment>
      <AutoSizer>
        {({ height, width }) => (
          <List
            null={false}
            height={height}
            itemCount={details.length}
            itemSize={70}
            width={width}
          >
            {Row}

          </List>
        )}
      </AutoSizer>
    </React.Fragment>
  )
}
