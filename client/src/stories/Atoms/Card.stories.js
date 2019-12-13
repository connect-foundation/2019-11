import React from 'react';

import Card from '../../components/Atoms/Card';
import data from '../../mock/popular-items/popular-items'

export default {
  title: 'Atoms|Card',
};

export const card = () => {
  return (
    <Card item={data[0]} />
  )
}