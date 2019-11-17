import styled from 'styled-components'

const Component = styled.input`
    font-family: 'BMJUA';
    width: 100%;
    padding: 0.5rem 1rem;
    border: #dfdfdf solid 1.5px;
    border-radius: 10px;
    outline:none;
    font-size:${props=> props.font}rem;

    transition: border .15s ease-in-out;

    &:focus{
        border: #ffae6a solid 1.5px;
    }
`

export default Component