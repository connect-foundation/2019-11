import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'
import styled from 'styled-components'

const Image = styled.img`
    width: 80%;
    height: 80%;
    object-fit: contain;
`

const LogoContainer = styled.div`
    display: flex;
    width: 5em;
    height: 5em;
    justify-content: center;
    align-items: center;
`;

const Components = () => {
    return (
        <Link to="/">
            <LogoContainer>
                <Image src={Logo} alt={"Logo"} />
            </LogoContainer>
        </Link>
    )
}

export default Components
