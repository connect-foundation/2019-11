import styled from 'styled-components'

const TextIcon = styled.span`
    font-family: 'BMJUA';
    font-size: 1.5em;
    position: absolute;
    display: grid;
    color: #FEF2C7;
    background: white;

    top: 0;
    left: 0;
    bottom : 0;
    right: 0;
    z-index:0;
    opacity: 0;
    transition: opacity .15s ease-in-out, color .15s ease-in-out;
    
    text-align:center;
    align-items:center;

    &:hover{
        opacity: 1;
        color: #FEAA6E;
    }
`

export default TextIcon