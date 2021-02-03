import styled from 'styled-components';

const Container = styled.div(({ marginTop }) => (`
margin-top: ${marginTop ? `${marginTop}px` : 0}
`));
export default Container;
