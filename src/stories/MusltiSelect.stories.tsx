import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import MultiSelect from '../ui/MultiSelect';

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
      name: 'Romanticism',
      isChecked: true,
    },
    {
      id: 2,
      name: 'Art',
      isChecked: true,
    },
    {
      id: 3,
      name: 'Nature',
      isChecked: true,
    },
    {
      id: 4,
      name: 'Art',
      isChecked: true,
    },
    {
      id: 5,
      name: 'Bataille',
      isChecked: true,
    },
    {
      id: 6,
      name: 'Realistic',
      isChecked: false,
    }
  ],
};
