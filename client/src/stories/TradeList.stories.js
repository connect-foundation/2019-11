import React from 'react';
import TradeList from '../components/TradeList';
import ButtonSelect from '../components/TradeList/ButtonSelect';
import ButtonDays from '../components/TradeList/ButtonDays';

import { action } from '@storybook/addon-actions';

export default {
  title: 'TradeList',
};

export const FullViewTradeList = () => (
    <div>
 <TradeList/>
    </div>
);

export const TradeListSelectButton = () => (
  <div>
    <ButtonSelect name="test"/>
  </div>
);

export const TradeListDaysButton = () => (
  <div>
    <ButtonDays select={action('clicked')}/>
  </div>
);