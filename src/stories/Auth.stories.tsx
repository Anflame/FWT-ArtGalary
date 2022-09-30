import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Auth from '../components/Auth';

export default {
  title: 'Auth',
  component: Auth,
} as ComponentMeta<typeof Auth>;

const Template: ComponentStory<typeof Auth> = (args) => <Auth {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isShowAuth: {
    logIn: false,
    signUp: false,
  }
};
