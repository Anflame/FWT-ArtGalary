import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Layout } from '../components/Layout';

export default {
  title: 'Layout',
  component: Layout,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/',
    }
  }
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = () => <Layout  />;

export const Primary = Template.bind({});
