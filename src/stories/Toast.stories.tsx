import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toast from '../ui/Toast';

export default {
  title: 'Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  message: 'Add your error message here.',
  isShowToast: true,
};
