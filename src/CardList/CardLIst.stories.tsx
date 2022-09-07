import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CardList } from './CardList';
import img from '../images/cardImg.jpg';

export default {
  title: 'cardList',
  component: CardList,
} as ComponentMeta<typeof CardList>;

const Template: ComponentStory<typeof CardList> = (args) => (
  <CardList {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  painters: [
    {
      id: 1,
      name: 'Painter',
      title: 'Painter',
      img,
    },
    {
      id: 2,
      name: 'Painter',
      title: 'Painter',
      img,
    },
    {
      id: 3,
      name: 'Painter',
      title: 'Painter',
      img,
    },
    {
      id: 4,
      name: 'Painter',
      title: 'Painter',
      img,
    },
    {
      id: 5,
      name: 'Painter',
      title: 'Painter',
      img,
    },
  ],
};
