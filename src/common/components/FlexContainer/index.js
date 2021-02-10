import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';


const FlexContainer = styled(Grid)`
  height: ${(props) => props.height};
  &.MuiGrid-root {
    flex-grow: 1;
  }
  & .MuiGrid-item {
    display: flex;
    & .MuiPaper-root {
      flex: 1
    }
  }
`;

export default FlexContainer;
