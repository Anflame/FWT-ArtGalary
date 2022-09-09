import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextArea from '../components/TextArea';

export default {
  title: 'TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  // isError: true,
};
