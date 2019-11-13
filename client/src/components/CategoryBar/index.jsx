import React, {useState} from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import CategoryIcon from './CategoryIcon'
import Clothes from '../../assets/clothes.svg'
import ExpandList from './ExpandList'

const Container = styled.div`
    display:flex;
    border-right: gray 0.5px solid;
`

const OriginWrapper = styled.div`
    width: 5em;
    display:flex;
    flex-direction:column;
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
                        img={Clothes}
                        text="옷"
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

