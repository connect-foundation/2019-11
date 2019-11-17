import styled from 'styled-components'

const Component = styled.a`
    width: 100%;
    height: 4rem;
    padding: 0.5rem 0.25rem;
    border: #bfbfbf solid 1px;
    background: #eeeeee;
    font-size: 1.3rem;
    box-sizing:border-box;
    text-decoration:none;
    color: black;
    line-height:2rem;

    transition: border .2s ease-in-out;

    &:hover, &:focus{
        border: #ffae6a solid 2px;
        border-radius: 10px;
    }
`

export default Component