import styled from 'styled-components';
import { theme } from 'src/theme';

export const TableVariants = Object.freeze({
  IP: 'ip',
  SENDER: 'sender',
})

export const FormattingOptions = {
  style: 'percent',
  maximumFractionDigits: 2,
}


export const RowWrapper = styled.div((props) => (`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${props.odd ? '#F2F2F2' : '#FFFFFF'};
  padding: ${props.padding || '0'}
`));

export const Item = styled.div`
  width: 12.5%;
  text-align: center;
`;

export const EmptyMessage = styled.span(() => (`
color: ${theme.colors.blue1};
font-size: 20px;
padding: 5px;
`));
