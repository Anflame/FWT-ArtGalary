import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import img from '../assets/images/cardImg.jpg';
import CardList from '../components/CardList';

export default {
  title: 'cardList',
  component: CardList,
} as ComponentMeta<typeof CardList>;

const Template: ComponentStory<typeof CardList> = (args) => (
  <CardList {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
};
