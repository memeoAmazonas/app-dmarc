import React from 'react';
import _ from 'lodash'
import { FormattedNumber, FormattedMessage } from 'react-intl'

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Font from 'common/components/Font';
import {
  TableVariants, FormattingOptions, Item, RowWrapper,
} from './index'


export const DetailsSubTable = ({ variant, summary }) => {
  const details = variant === TableVariants.SENDER
    ? summary.recordsSummaryByIp() : summary.recordsByCombinations();

  if (_.isEmpty(summary)) return null
    

   const Row = ({ index, style }) => {
    const odd = index % 2 !== 0
    const ipDetail = details[index]
    
    return (
      <RowWrapper odd={odd} style={style}>
        {
          <Item align="center">
            <b>{ Object.keys(ipDetail)[0] }</b>
          </Item>
        }
        {
          Object.values(ipDetail)[0].map((detail) => (
            <React.Fragment key={_.uniqueId(`${Object.keys(ipDetail)[0]}-ip-details-`)}>
              
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
                  <Item>{ detail.ips }</Item>
                  ) : (null)
              }
              <Item align="center">{ detail.recordsMessages }</Item>
              {
                variant === TableVariants.IP ? (
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
                ) : (null)
              }
            </React.Fragment>
          ))
        }
      </RowWrapper>
    )
  }

  return (
    <React.Fragment>
      <AutoSizer>
        {({ height, width }) => (
          <List
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



