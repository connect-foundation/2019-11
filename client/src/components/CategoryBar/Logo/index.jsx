import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'
import styled from 'styled-components'

const Image = styled.img`
    width: 100%;
    height: same-as-width;
`

const Components = (props) => {
    return (
        <Link to="/">
            <Image src={Logo} alt={"Logo"} />
        </Link>
    )
}

export default Components
