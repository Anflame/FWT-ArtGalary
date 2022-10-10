import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardList from '../components/PainterItem';

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
