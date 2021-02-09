import styled from 'styled-components';

const Container = styled.div(({ marginTop = 0, width = 'inherit', display = 'block' }) => (`
margin-top: ${marginTop}px;
width: ${width};
display: ${display};
justify-content: center;
`));
export default Container;
