import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import LogIn from '../components/LogIn';

export default {
  title: 'LogIn',
  component: LogIn,
} as ComponentMeta<typeof LogIn>;

const Template: ComponentStory<typeof LogIn> = (args) => <LogIn {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isShowLogIn: true,
};
