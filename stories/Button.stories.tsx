import React, { useContext } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const expandBtn = Template.bind({});

expandBtn.args = {
  isDisabled: false,
  children: '>',
  className: 'expandBtn',
  isOutlined: true,
};

export const authBtn = Template.bind({});

authBtn.args = {
  isDisabled: false,
  children: 'Button',
  className: 'logInSigUpBtn',
};

