import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignUp from '../components/SignUp';

export default {
  title: 'SignUp',
  component: SignUp,
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = (args) => <SignUp {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isShowSignUp: true,
};
