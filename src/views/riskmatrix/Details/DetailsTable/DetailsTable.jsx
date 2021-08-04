import React, { useState, useEffect, useRef } from 'react';
import {
  forEach, groupBy, isEmpty, compact, filter, keys,
} from 'lodash';
import styled from 'styled-components';
import { FormattedMessage, FormattedNumber } from 'react-intl'

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import Button from 'common/components/Button'
import { SpfDkimSummary } from 'common/classes/records/dmarc.class'
import Font from 'common/components/Font';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import Search from 'views/riskmatrix/Details/DetailsTable/Search';
import { EmptyMessage } from 'views/riskmatrix/Details/DetailsTable/index';
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
  const groupedRecords = groupBy(records, by);
  forEach(groupedRecords, (recs, identifier) => {
    const rowSummary = new SpfDkimSummary(identifier, recs);
    summary.push(rowSummary);
  })

  return summary;
}

export const DetailsTable = ({ variant, records, intl }) => {
  const [selected, setSelected] = useState(-1);
  const [previous, setPrevious] = useState();
  const [summaries, setSumaries] = useState();
  const [fil, setFilter] = useState();
  const listRef = useRef();
  const [original, setOriginal] = useState(); React.useState();
  const actual = prepareForVariantDisplay(records, variant)
    .sort((a, b) => (a.totalMessages > b.totalMessages ? -1 : 1)); // Desc order
  useEffect(() => {
    if (previous) listRef.current.scrollToItem(previous)
  }, [previous])
  useEffect(() => {
    if (!summaries) {
      setSumaries(actual);
    }
  });
  useEffect(() => {
    setFilter(null);
    setSumaries(actual);
  }, [records]);
  useEffect(() => {
    if (fil && selected === -1) {
      // eslint-disable-next-line array-callback-return
      const onFil = actual.map((e) => {
        const uni = [];
        e.records.forEach((i) => {
          if (i.sourceIp.includes(fil)) {
            uni.push(i)
          }
        })
        if (uni.length > 0) {
          e.records = uni;
          return e;
        }
      });
      setSumaries(compact(onFil));
    } else if (!fil) {
      setSumaries(actual);
    }
  }, [fil, selected]);

  const selectIndex = (index) => {
    if (selected === index) {
      setPrevious(index)
      setSelected(-1);
      setOriginal(null);
    } else {
      setSelected(index);
      const ac = filter(actual, (e) => e.identifier === summaries[index].identifier);
      setOriginal(ac[0]);
    }
  }
  const onSearch = (e) => setFilter(e);
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
                selected === index && (
                  <KeyboardArrowLeftIcon />
                )
              }
            <Font variant="h5" component="span">
              <b>{ summary.identifier }</b>
            </Font>
            {
                !(selected === index) && (<KeyboardArrowRightIcon />)
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
            variant === TableVariants.SENDER && (
              <Item align="center">
                <Font variant="h5" component="span">
                  { FormatNumberESService
                    .formatNumber(intl, summary.detail.ips ? summary.detail.ips : 0) }
                </Font>
              </Item>
            )
          }
        </React.Fragment>
        <Item align="center">
          <Font variant="h5" component="span">
            { FormatNumberESService
              .formatNumber(intl, summary.totalMessages ? summary.totalMessages : 0) }
          </Font>
        </Item>
        {
           variant === TableVariants.IP && selected >= 0 && (
             <React.Fragment>
               <Item>-</Item>
               <Item>-</Item>
               <Item>-</Item>
             </React.Fragment>
           )
        }
      </RowWrapper>
    )
  };
  const isExist = () => {
    if (selected >= 0) {
      let act;
      if (variant === TableVariants.SENDER) {
        act = original.recordsSummaryByIp();
      } else {
        act = original.recordsByCombinations();
      }
      return isEmpty(filter(act, (k) => keys(k)[0].includes(fil)));
    }
    return isEmpty(summaries);
  }
  return (
    <React.Fragment>
      <Search value={fil} onSearch={onSearch} exist={isExist()} />
      { isEmpty(summaries) && (
        <EmptyMessage><FormattedMessage id="not.have.data" /></EmptyMessage>
      )}
      {!isEmpty(summaries) && (
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
                  intl={intl}
                  variant={variant}
                  summary={original}
                  filter={fil}
                />
              </Container>`
            </React.Fragment>
          )
        }
      </React.Fragment>
      )}
    </React.Fragment>
  )
}
