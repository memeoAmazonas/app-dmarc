import styled from 'styled-components';

const Separator = styled.div`
    width: 100%;
    height: 1px;
    margin: 20px 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.grey6};
`;

export default Separator;
