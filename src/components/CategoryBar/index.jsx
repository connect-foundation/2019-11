import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import CategoryIcon from './CategoryIcon'
import Cloth from '../../assets/cloth.svg'
import Electronic from '../../assets/television.svg'
import ExpandList from './ExpandList'

const WIDTH = 5;

const Container = styled.div`
    display:flex;
    position:relative;
`

const OriginWrapper = styled.div`
    width: ${WIDTH}rem;
    display:flex;
    flex-direction:column;
    z-index: 2;
    background: #beddbf77;
    border-right: #FEAA6E 0.2rem solid;
`

const ListWrapper = styled.div`
    position:absolute;
    width: ${props=> props.open ? 15 : 0}rem;
    height:100%;
    left: ${WIDTH}em;
    z-index: 999;

    overflow: hidden;
    transition: width .35s ease-in-out;
`

const Bar = styled.div`
    height: 100%;
    width: 100%;
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
            <ListWrapper open={open} >
                <ExpandList/>
            </ListWrapper>
        </Container>
    )
}

export default Components

