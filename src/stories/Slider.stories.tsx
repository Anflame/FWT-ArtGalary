import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { slides } from '../constants';
import Slider from '../components/Slider';

export default {
  title: 'Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  slides: slides,
  isShowSlider: false,
};
