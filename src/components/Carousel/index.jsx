import React, {useState} from 'react'
import styled from 'styled-components'
import NextButton from './NextButton'
import BeforeButton from './BeforeButton'
import CarouselImage from './CarouselImage'
import AddButton from './AddButton'

const Container = styled.div`
    width:20em;
    height:20em;
    box-sizing: border-box;
    background-color: #e0e0e0;
    position:relative;
`

const LeftDiv = styled.div`
    position:absolute;
    display:flex;
    height:100%;
    width:2.5em;
    left:0;
`

const Window = styled.div`
    width: 20em;
    height: 20em;
    box-sizing:border-box;
    overflow:hidden;
`

const Panel = styled.div`
    display:flex;
    width: 220em;
    height: 20em;
    transform: ${props => `translateX(calc(-20em * ${props.idx}))`};

    transition : transform 0.1s ease-in-out;
`

const RightDiv = styled.div`
    position:absolute;
    display:flex;
    width:2.5em;
    height:100%;
    right:0;
`

const CarouselItem = styled.div`
    width: 20em;
    height: 20em;
`

const renderImage = (imgSrc) => {
    return (
        <CarouselItem>
            <CarouselImage src={imgSrc}/>
        </CarouselItem>
    )
}

const Components = () => {

    const dummy = ['http://www.foodnmed.com/news/photo/201903/18296_3834_4319.jpg',
'https://pds.joins.com/news/component/htmlphoto_mmdata/201904/08/1d956ae6-eb9c-4a04-8f1f-d1a9e719cde5.jpg',
'http://ko.experiments.wikidok.net/api/File/Real/5a8a654951334d0a0260e718']

    const [showIdx, changeIdx] = useState(0);
    const [imageList, setImageList] = useState(dummy);

    const handleLeft = event => changeIdx(showIdx > 0 ? showIdx -1 : 0)
    const handleRight = event => changeIdx(showIdx < imageList.length ? showIdx+ 1 : imageList.length)

    return (
        <Container>
            <LeftDiv>
                <BeforeButton visible={showIdx !== 0} onClick={handleLeft}/>
            </LeftDiv>
            <RightDiv>
                <NextButton visible={showIdx !== imageList.length } onClick={handleRight}/>
            </RightDiv>
            <Window>
                <Panel idx={showIdx}>
                    { imageList.map(value => renderImage(value)) }
                    <AddButton />
                </Panel>
            </Window>
        </Container>
    )
}

export default Components
