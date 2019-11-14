import React from 'react'

import List from '../components/ItemList'
import ListItem from '../components/ItemList/ListItem'
import ItemCategorySelector from '../components/ItemCategorySelector'

export default {
    title: 'List',
};

export const listItem = () => {
    return (
        <ListItem selected={false} text={'비활성화'}></ListItem>
    )
}

export const selectedListItem = () => {
    return (
        <ListItem selected={true} text={'활성화'}></ListItem>
    )
}

export const itemList = () => {
    const items = ['아이템1', '아이템2', '아이템3', '아이템4'];
    return (
        <List list={items}/>
    )
}

export const itemListScroll = () => {
    const items = ['아이템1', '아이템2', '아이템3', '아이템4','아이템5','아이템6','아이템7','아이템8','아이템9',];
    return (
        <List list={items}/>
    )
}

export const categoryListSelect = () => {
    return (
        <ItemCategorySelector/>
    )
}