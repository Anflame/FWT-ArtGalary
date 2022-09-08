import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from '../Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  currentPage: 3,
  maxPages: 7,
};
