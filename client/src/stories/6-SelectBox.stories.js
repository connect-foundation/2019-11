import React from 'react'

import SelectBox from '../components/Molecules/SelectBox'
import ListItem from '../components/Molecules/SelectBox/ListItem'
import SelectList from '../components/Molecules/SelectBox/List'

export default {
    title: 'SelectBox',
};

export const listItem = () => {

    return (
        <>
            <ListItem text={"아이템"} selected={false} />
            <ListItem text={'아이템'} selected={true} />
        </>
    )

}

export const selectList = () => {
    const dummy = ['아이템 1', '아이템 2', '아이템 3']
    const showCount = 5;
    return (
        <SelectList show={showCount} list={dummy} selected={1} />
    )
}

export const selectBox = () => {

    const dummy = ['아이템 1', '아이템 2', '아이템 3']
    const dummy2 = ['아이템 1', '아이템 2', '아이템 3', '아이템 4', '아이템 5', '아이템 6']

    return (
        <>

            <div>None Scroll</div>
            <SelectBox list={dummy} />
            <div>Scroll</div>
            <SelectBox list={dummy2} />
        </>
    )
}