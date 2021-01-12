import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { FormattedNumber, FormattedMessage } from 'react-intl'

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import Button from 'common/components/Button'
import { SpfDkimSummary } from 'common/classes/records/dmarc.class'
import Font from 'common/components/Font';
import { DetailsTableHead } from './DetailsTableHead'
import { DetailsSubTable } from './DetailsSubTable'
import {
  TableVariants, FormattingOptions, Item, RowWrapper,
} from './index'


const Container = styled.div((props) => (`
  width: 100%;
  height: 400px;
  display: ${props.display || 'block'};
`));

const prepareForVariantDisplay = (records, variant) => {
  const by = variant === TableVariants.SENDER ? 'sourceBaseDomain' : 'sourceIp'

  const summary = []
  const groupedRecords = _.groupBy(records, by);
  _.forEach(groupedRecords, (recs, identifier) => {
    const rowSummary = new SpfDkimSummary(identifier, recs);
    summary.push(rowSummary);
  })

  return summary;
}

export const DetailsTable = ({ variant, records }) => {
  const [selected, setSelected] = useState(-1);
  const [previous, setPrevious] = useState();
  const listRef = useRef();
  const summaries = prepareForVariantDisplay(records, variant)
    .sort((a, b) => (a.totalMessages > b.totalMessages ? -1 : 1)); // Desc order

  useEffect(() => {
    if (previous) listRef.current.scrollToItem(previous)
  }, [previous])

  const selectIndex = (index) => {
    if (selected === index) {
      setPrevious(index)
      setSelected(-1);
    } else {
      setSelected(index)
    }
  }

  if (_.isEmpty(summaries)) return null

  const Row = ({ index, style, force = false }) => {
    const summary = summaries[index]
    const odd = index % 2 !== 0

    return (
      <RowWrapper style={style} odd={force || odd}>
        <Item>
          <Button
            dmarcvariant="link"
            decoration="none"
            onClick={() => selectIndex(index)}
          >
              {
                selected === index ? (
                  <KeyboardArrowLeftIcon />
                ) : null
              }
              <Font variant="h5" component="span">
                <b>{ summary.identifier }</b>
              </Font>
              {
                selected === index ? (
                  null
                ) : (<KeyboardArrowRightIcon />)
              }
          </Button>
        </Item>
        <Item align="center">
          <Font variant="h5" component="span">
            <FormattedNumber
              value={summary.detail.dmarcAlignmentPassPerc}
              {...FormattingOptions}
            />
          </Font>
        </Item>
        <Item align="center">
          <Font variant="h5" component="span">
            <FormattedNumber value={summary.detail.spfPassPerc} {...FormattingOptions} />
          </Font>
        </Item>
        <Item align="center">
          <Font variant="h5" component="span">
            <FormattedNumber
              value={summary.detail.spfAlignmentPassPerc}
              {...FormattingOptions}
            />
          </Font>
        </Item>
        <Item align="center">
          <Font variant="h5" component="span">

            <FormattedNumber value={summary.detail.dkimPassPerc} {...FormattingOptions} />
          </Font>
        </Item>
        <Item align="center">
          <Font variant="h5" component="span">

            <FormattedNumber
              value={summary.detail.dkimAlignmentPassPerc}
              {...FormattingOptions}
            />
          </Font>
        </Item>
        <React.Fragment>
          {
            variant === TableVariants.SENDER ? (
              <Item align="center">
                <Font variant="h5" component="span">
                  { summary.detail.ips }
                </Font>
              </Item>
            ) : (null)
          }
        </React.Fragment>
        <Item align="center">
          <Font variant="h5" component="span">
            { summary.totalMessages }
          </Font>
        </Item>
        {
           variant === TableVariants.IP && selected >= 0 ? (
            <React.Fragment>
              <Item>-</Item>
              <Item>-</Item>
              <Item>-</Item>
            </React.Fragment>
           ) : null
        }
      </RowWrapper>
    )
  };

  return (
    <React.Fragment>
      <DetailsTableHead variant={variant} extra={selected >= 0} />
      <Container display={selected < 0 ? 'block' : 'none'}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              height={height}
              itemCount={summaries.length}
              itemSize={70}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </Container>
      {
        selected >= 0 && (
          <React.Fragment>
            <Row force index={selected} style={{ height: 70, width: '100%' }} />
            <Container>
              <DetailsSubTable
                variant={variant}
                summary={summaries[selected]}
              />
            </Container>`
          </React.Fragment>
        )
      }
    </React.Fragment>
  )
}