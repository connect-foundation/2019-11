import React, { useState } from 'react'
import Logo from './Logo'
import CategoryIcon from './CategoryIcon'
import Cloth from '../../assets/cloth.svg'
import Electronic from '../../assets/television.svg'
import LifeStyle from '../../assets/geek.svg'
import ExpandList from './ExpandList'

import { Container, OriginWrapper, ListWrapper, Bar, List } from './CategoryBarStyle'

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
                        <CategoryIcon
                            color="#5C5749"
                            img={LifeStyle}
                            text="생활"
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

