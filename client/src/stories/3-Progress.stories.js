import React from 'react'

import ProgressButton from '../components/Organisim/RegisterProgress/Button'
import RegisterProgress from '../components/Organisim/RegisterProgress'

export default {
    title: 'Progress',
};

export const button = () => {
    return (
        <ProgressButton text={"Step.1 상품등록"}></ProgressButton>
    )
}

export const activeButton = () => {
    return (
        <ProgressButton text={"Step.1 상품등록"} active={true}></ProgressButton>
    )
}

export const registerProgress = () => {
    return (
        <RegisterProgress />
    )
}