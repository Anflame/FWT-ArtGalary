import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditPainting from '../ui/EditPainting';

export default {
  title: 'EditPainting',
  component: EditPainting,
} as ComponentMeta<typeof EditPainting>;

const Template: ComponentStory<typeof EditPainting> = (args) => <EditPainting {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isShowEditPainting: true,
};  
