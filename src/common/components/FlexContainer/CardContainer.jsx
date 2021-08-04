import styled from 'styled-components';
import Card from 'common/components/Card/Card';

export const ContainerCardRadio = styled(Card)`
  padding: 20px;
  max-height: 300px;
`;

export const ItemsRadioList = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  max-width: 300px;
  text-decoration: none;
  padding-left: 10px;
`;

export const RangeSelectorContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
