import React, {useState} from 'react'
import styled from 'styled-components'

import RemoveButton from '../RemoveButton'

const Container = styled.div`
    width: inherit;
    height: inherit;
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;
    margin:auto;
`

const CloseDiv = styled.div`
    position: absolute;
    top:0.5em;
    right:0.5em;
    display: ${props => props.show ? 'block' : 'none'};
`

const Components = (props) => {

    const { src, onRemove } = props

    const [hover, setHover] = useState(false);
    
    const handleMouseOn = event => setHover(true)
    const handleMouseOut = event => setHover(false);

    return (
        <Container onMouseEnter={handleMouseOn} onMouseLeave={handleMouseOut} >
            <Image src={src}/>
            <CloseDiv show={hover}>
                <RemoveButton onClick={ev => { onRemove() }}/>
            </CloseDiv>
        </Container>
    )
}

export default Components