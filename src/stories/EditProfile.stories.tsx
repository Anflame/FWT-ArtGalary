import React, { useContext } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditProfile from '../ui/EditProfile';

export default {
  title: 'EditProfile',
  component: EditProfile,
} as ComponentMeta<typeof EditProfile>;

const Template: ComponentStory<typeof EditProfile> = (args) => <EditProfile {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  isShowEditProfile: true,
};
