import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import MultiSelect from '../ui/MultiSelect';
import { selectListArray } from '../constants';

export default {
  title: 'MultiSelect',
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;

const Template: ComponentStory<typeof MultiSelect> = (args) => <MultiSelect {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  selectList: selectListArray
};
