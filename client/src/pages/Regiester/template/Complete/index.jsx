import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

import PageBase from '../../../../components/PageBase'
import Button from '@material-ui/core/Button'

import { termList } from '../../constants'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const ContentDiv = styled.div`
    width:80%;
    margin: 0 auto;
`

const ButtonContainer = styled.div`
    width: 100%;
    height: 3em;
    display:flex;
    justify-content:flex-end;
`

const TopContentDiv = styled.div`
  width:100%;
  height: 20rem;
  display:flex;
  justify-content: space-between; 
`

const CarouselDiv = styled.div`
    width: 45%;
    min-width: 20rem;
    height: 100%;
    display:flex;
    align-items:center;
`

const InputDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-end;
    width: 45%;
    min-width: 30rem;
    height: 100%;
`

const DetailInput = styled.textarea`
    width:100%;
    height: 20rem;
    border: #ffae6a solid 1px;
    resize: none;
`

const generateDayList = () => {

    return termList.map((value) => {
        const { title, term } = value
        const deadline = new Date()
        deadline.setDate(deadline.getDate() + term)
        const newTitle = `${title}  ~${deadline.getFullYear()}.${deadline.getMonth() + 1}.${deadline.getDate()} ${deadline.getHours()}시`

        return newTitle
    })
}

const Component = (props) => {
    const classes = useStyles();

    const { width, next } = props
    const dayList = generateDayList()

    const [dayIdx, setDayIdx] = useState(-1)

    return (
        <PageBase width={width}>
            <ContentDiv>
                <ButtonContainer>
                    <Button disabled variant="outlined" onClick={next} className={classes.button}>다음</Button>
                </ButtonContainer>
            </ContentDiv>
        </PageBase>
    )
}

export default Component