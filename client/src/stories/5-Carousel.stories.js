import React from 'react'

import AddButton from '../components/Carousel/AddButton'
import RemoveButton from '../components/Carousel/RemoveButton'
import CarouselItem from '../components/Carousel/CarouselImage'
import Carousel from '../components/Carousel'

export default {
    title: 'Carousel',
};

export const removeButton = () => {
    return(
        <div style={{background:'#d0d0d0'}}>
        <RemoveButton/>
        </div>
    )
}

export const carouselImage = () => {
    return (
        <div style={{width:500, hegith:500}}>
            <CarouselItem src="http://miro.medium.com/max/318/1*1OKmA2EdGln8O6RCVORgGg.png"/>
        </div>
    )
}

export const carouselImageAdd = () => {
    return (
        <AddButton/>
    )
}

export const carousel = () => {
    return (
        <Carousel/>
    )
}