import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import MultiSelect from '../MultiSelect';

export default {
  title: 'MultiSelect',
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;

const Template: ComponentStory<typeof MultiSelect> = (args) => <MultiSelect {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  selectList: [
    {
      id: 1,
      title: 'Romanticism',
      isChecked: true,
    },
    {
      id: 2,
      title: 'Art',
      isChecked: true,
    },
    {
      id: 3,
      title: 'Nature',
      isChecked: true,
    },
    {
      id: 4,
      title: 'Art',
      isChecked: true,
    },
    {
      id: 5,
      title: 'Bataille',
      isChecked: true,
    },
    {
      id: 6,
      title: 'Realistic',
      isChecked: false,
    }
  ],
};
