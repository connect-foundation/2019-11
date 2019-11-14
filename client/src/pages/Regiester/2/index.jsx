import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

import PageBase from '../../../components/PageBase'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

const ContentDiv = styled.div`
    width:100%;
`

const ButtonContainer = styled.div`
    width: 100%;
    height: 3em;
    display:flex;
    justify-content:space-between;
`

const Component = (props) => {
    const classes = useStyles();

    const { width, prev, next } = props

    return (
        <PageBase width={width}>
            <ContentDiv>

            </ContentDiv>
            <ButtonContainer>
                <Button variant="outlined" onClick={prev} className={classes.button}>이전</Button>
                <Button variant="outlined" onClick={next} className={classes.button}>다음</Button>
            </ButtonContainer>
        </PageBase>
    )
}

export default Component