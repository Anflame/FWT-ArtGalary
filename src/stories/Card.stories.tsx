import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import image from '../assets/images/cardImg.jpg';
import Card from '../ui/Card';
import '../index.scss';

export default {
  title: 'authorCard',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isPrimary: true,
  image,
  title: 'Jean-Honore Fragonard',
};
