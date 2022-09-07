import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './Card';
import img from '../images/cardImg.jpg';

export default {
  title: 'authorCard',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  img,
  title: 'Jean-Honore Fragonard',
};
