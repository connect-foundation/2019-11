import styled from 'styled-components'

const Component = styled.input`
    font-family: 'BMJUA';
    width: 100%;
    padding: 0.25rem 0.5rem;
    box-sizing: border-box;
    border:none;
    outline:none;
    font-size:${props=> props.font}rem;
`

export default Component