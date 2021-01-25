import React from 'react';
import { FormattedMessage } from 'react-intl'

import Font from 'common/components/Font';
import { TableVariants, RowWrapper, Item } from './index'


export const DetailsTableHead = ({ variant, extra }) => {
  return (
    <RowWrapper padding="40px 0">
      <Item>
        <Font variant="h5" component="span">
          <b>
            <FormattedMessage id={
              variant === TableVariants.SENDER
                ? 'risk.matrix.table.senders'
                : 'risk.matrix.table.ip'
            }
            />
          </b>
        </Font>
      </Item>
      <Item>
        <Font variant="h5" component="span">
          <b>
            <FormattedMessage id="risk.matrix.table.dmarcAlignment" />
          </b>
        </Font>
      </Item>
      <Item>
        <Font variant="h5" component="span">
          <b>
            <FormattedMessage id="risk.matrix.table.spfPass" />
          </b>
        </Font>
      </Item>
      <Item>
        <Font variant="h5" component="span">
          <b>
            <FormattedMessage id="risk.matrix.table.spfAlignment" />
          </b>
        </Font>
      </Item>
      <Item>
        <Font variant="h5" component="span">
          <b>
            <FormattedMessage id="risk.matrix.table.dkim" />
          </b>
        </Font>
      </Item>
      <Item>
        <Font variant="h5" component="span">
          <b>
            <FormattedMessage id="risk.matrix.table.dkimAlignmet" />
          </b>
        </Font>
      </Item>
      {
          variant === TableVariants.SENDER && (
            <Item>
              <Font variant="h5" component="span">
                <b>
                  <FormattedMessage id="risk.matrix.table.ips" />
                </b>
              </Font>
            </Item>
          )
        }
      <Item>
        <Font variant="h5" component="span">
          <b>
            <FormattedMessage id="risk.matrix.table.messages" />
          </b>
        </Font>
      </Item>
      {
          variant === TableVariants.IP && extra && (
            <React.Fragment>
              <Item align="center">
                <Font variant="h5" component="span">
                  <b><FormattedMessage id="risk.matrix.table.EnvelopeFrom" /></b>
                </Font>
              </Item>
              <Item align="center">
                <Font variant="h5" component="span">
                  <b><FormattedMessage id="risk.matrix.table.HeadersFrom" /></b>
                </Font>
              </Item>
              <Item align="center">
                <Font variant="h5" component="span">
                  <b><FormattedMessage id="risk.matrix.table.DkmiDomain" /></b>
                </Font>
              </Item>
            </React.Fragment>
          )
        }
    </RowWrapper>
  )
}
