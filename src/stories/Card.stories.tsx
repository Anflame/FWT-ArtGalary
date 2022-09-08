import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from '../Card/Card';
import img from '../assets/images/cardImg.jpg';

export default {
  title: 'authorCard',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isPrimary: true,
  img,
  title: 'Jean-Honore Fragonard',
};
