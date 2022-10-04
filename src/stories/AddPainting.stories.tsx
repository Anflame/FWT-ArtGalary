import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddPainting from '../components/AddPainting';

export default {
  title: 'AddPainting',
  component: AddPainting,
} as ComponentMeta<typeof AddPainting>;

const Template: ComponentStory<typeof AddPainting> = (args) => <AddPainting {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isShowAddPhoto: true,
};
