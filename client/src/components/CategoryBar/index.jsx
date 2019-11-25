import React, { useState } from 'react'
import Logo from './Logo'
import CategoryIcon from './CategoryIcon'
import ExpandList from './ExpandList'
import LoginButton from './LoginButton'
import Profile from './Profile'
import { MainModal } from '../'

import Cloth from '../../assets/cloth.svg'
import Electronic from '../../assets/television.svg'
import LifeStyle from '../../assets/geek.svg'

import detailCategoryList from '../../data/detail-category-list'


import { Container, OriginWrapper, ListWrapper, Bar, List, DivisionLine } from './CategoryBarStyle'

const Components = () => {

    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [selectIdx, setSelectIdx] = useState(1);

    const handleClick = (e) => {
        const { idx } = e.target.dataset;
        if(selectIdx === idx || open === false) {
            setOpen(!open);
        }
        setSelectIdx(idx);
    }

    const handleLoginClick = () => {
        setLoginOpen(!loginOpen);
    }

    const handleLoginClose = () => {
        loginOpen === true && setLoginOpen(!loginOpen);
    }

    return (
        <Container>
            <OriginWrapper>
                <Logo />
                <Bar>
                    { isLogin === true ? <Profile active={open}/> : <LoginButton onClick={handleLoginClick}/> }
                    <DivisionLine/>
                    <List>
                        <CategoryIcon
                            color="#FFE1A2"
                            img={Cloth}
                            text="의류"
                            active={open}
                            onClick={handleClick}
                            idx={1}
                        />
                        <CategoryIcon
                            color="#BEDDBF"
                            img={Electronic}
                            text="가전"
                            active={open}
                            onClick={handleClick}
                            idx={2}
                        />
                        <CategoryIcon
                            color="#5C5749"
                            img={LifeStyle}
                            text="생활"
                            active={open}
                            onClick={handleClick}
                            idx={3}
                        />
                    </List>
                </Bar>
            </OriginWrapper>
            <ListWrapper open={open}>
                <ExpandList 
                    open={open} 
                    idx={selectIdx} 
                    details={detailCategoryList[selectIdx - 1]}
                />
            </ListWrapper>
            <MainModal onClose={handleLoginClose} open={loginOpen}/>
        </Container>
    )
}

export default Components

