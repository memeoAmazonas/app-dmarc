import styled from 'styled-components';

import Card from '@material-ui/core/Card';

const StyledCard = styled(Card)`
  padding: ${(props) => (props.padding ? props.padding : '0')};
  &.MuiPaper-root {
    box-shadow: 0px 4px 10px -2px rgba(0,0,0,0.06), 0px 4px 10px -2px rgba(0,0,0,0.06), 0px 4px 10px -2px rgba(0,0,0,0.06);
  }
`;

export default StyledCard;
