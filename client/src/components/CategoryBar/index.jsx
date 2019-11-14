import React, {useState} from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import CategoryIcon from './CategoryIcon'
import Cloth from '../../assets/cloth.svg'
import Electronic from '../../assets/television.svg'
import ExpandList from './ExpandList'

const Container = styled.div`
    display:flex;
`

const OriginWrapper = styled.div`
    width: 5em;
    display:flex;
    flex-direction:column;
    z-index: 2;
    background: white;
    border-right: #FEF2C7 0.2rem solid;
`

const Bar = styled.div`
    height: 100%;
    width: 5em;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0.5em 1em;
`

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const Components = () => {

    const [open, setOpen] = useState(false);

    const handleClick = (event) => setOpen(!open)
    

    return (
        <Container>
            <OriginWrapper>
            <Logo />
            <Bar>
                <List>
                    <CategoryIcon
                        color="#FFE1A2"
                        img={Cloth}
                        text="의류"
                        active={open}
                        onClick={handleClick}
                    />
                    <CategoryIcon
                        color="#BEDDBF"
                        img={Electronic}
                        text="가전"
                        active={open}
                        onClick={handleClick}
                    />
                </List>
            </Bar>
            </OriginWrapper>
            <ExpandList open={open}/>
        </Container>
    )
}

export default Components

