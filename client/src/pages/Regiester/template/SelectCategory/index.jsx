import React from 'react'
import styled from 'styled-components'

import PageBase from '../../../../components/PageBase'
import Button from '../../../../components/BoxButton'
import CategorySelector from '../../../../components/ItemCategorySelector'

const ContentDiv = styled.div`
    width:60%;
    margin: 0 auto;
`

const ButtonContainer = styled.div`
    width: 100%;
    height: 3em;
    display:flex;
    justify-content:flex-end;
    margin: 1rem 0;
`

const Component = (props) => {

    const { width, next } = props

    return (
        <PageBase width={width}>
            <ContentDiv>
                <CategorySelector />
                <ButtonContainer>
                    <Button onClick={next} text={'다음'}/>
                </ButtonContainer>
            </ContentDiv>
        </PageBase>
    )
}

export default Component