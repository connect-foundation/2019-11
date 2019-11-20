import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 15em;
    height: 100%;
    overflow-y: auto;
    background-color: #ffe1a2;  
    box-sizing: border-box;
    z-index: 1;
`;

const DetailCategory = styled.div`
    font-family: "BMJUA";
    font-size: large;
    text-align: center;
    padding: 1em;
    cursor: pointer;

    transition: all .3s ease-in-out;
    &:hover {
        background-color: #EC8852;
    }

    label {
        cursor: pointer;
    }
`;


const Components = ({idx, open, details}) => {
    const detailCategoryList = details.details;

    return (
        <Container idx={idx} open={open}>
            {detailCategoryList.map(
                category => 
                <DetailCategory>
                    <label>{category.title}</label>
                </DetailCategory>)}
        </Container>
    )
}

export default Components