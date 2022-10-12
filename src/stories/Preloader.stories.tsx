import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import img from '../assets/images/PreloaderImg.jpg';
import Preloader from '../ui/Preloader';

export default {
  title: 'Preloader',
  component: Preloader,
} as ComponentMeta<typeof Preloader>;

const Template: ComponentStory<typeof Preloader> = (args) => <Preloader {...args} />;

export const Primary = Template.bind({});

Primary.args = {
};
