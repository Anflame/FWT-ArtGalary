import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppRouter from '../components/AppRouter';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'AppRouter',
  component: AppRouter,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/profile/:painterId',
      routeParams: {painterId: '1'},
    }
  }
} as ComponentMeta<typeof AppRouter>;

const Template: ComponentStory<typeof AppRouter> = (args) => <AppRouter {...args} />;

export const Primary = Template.bind({});
